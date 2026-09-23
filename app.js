// flattens the db, works out traits, builds indexes and a link graph, and draws everything with plain html

// ---------- flatten and derive ----------

// flatten nested groups into one list, keeping where each entry came from
const all = wings.flatMap(g =>
  g.subgroups.flatMap(s =>
    s.entries.map(e => ({ ...e, group: g.group, subgroup: s.name }))
  )
);
const byId = new Map(all.map(e => [e.id, e]));

// add missing tags, measurements, and eras from facts.js
for (const e of all) {
  for (const t of tagPatches[e.id] || []) if (!e.tags.includes(t)) e.tags = [...e.tags, t];
  if (spans[e.id]) e.span = spans[e.id];
  if (eraOf[e.id]) e.era = eraOf[e.id];
  e.facts = facts[e.id] || [];
}
// eras act like one more ordered scale, but not every entry has one
scales.era = eras;
const optional = new Set(["era"]);

// work out size, speed, and aspect for each entry. first matching rule wins, then overrides
for (const e of all) {
  for (const rule of traitRules) {
    if (!rule.when(e)) continue;
    for (const [k, v] of Object.entries(rule.set)) if (!(k in e)) e[k] = v;
  }
  Object.assign(e, traitOverrides[e.id] || {});
}

// add environments, parts, pros and cons from physics.js
const envOf = new Map();
for (const [env, ids] of Object.entries(environments)) {
  for (const id of ids) {
    if (!envOf.has(id)) envOf.set(id, []);
    envOf.get(id).push(env);
  }
}

// flatten a parts tree into a plain list of names. a [name, children] pair counts as a branch
function flattenParts(tree) {
  const out = [];
  for (const node of tree || []) {
    if (Array.isArray(node)) { out.push(node[0]); out.push(...flattenParts(node[1])); }
    else out.push(node);
  }
  return out;
}

// estimate the reynolds number: speed times chord over viscosity.
// chord comes from the middle span divided by the aspect ratio
function reynolds(e) {
  const v = speedMs[e.speed];
  if (!e.span || !v) return null;
  const chord = Math.sqrt(e.span[0] * e.span[1]) / aspectRatio[e.aspect];
  return v * chord / fluids[e.fluid].viscosity;
}
const bandOf = re => flowBands.find(b => re < b.below);

for (const e of all) {
  e.env = envOf.get(e.id) || [];
  e.parts = parts[e.id] || [];
  e.partNames = flattenParts(e.parts);
  e.pros = tradeoffs[e.id]?.pros || [];
  e.cons = tradeoffs[e.id]?.cons || [];
  e.fluid = fluidOf[e.id] || "air";
  e.re = reynolds(e);
  e.flow = e.re === null ? null : bandOf(e.re).name;
}

// tag -> every parent tag above it, so filters on a parent also catch children
const parentsOf = new Map();
for (const [parent, kids] of Object.entries(tagParents)) {
  for (const k of kids) {
    if (!parentsOf.has(k)) parentsOf.set(k, []);
    parentsOf.get(k).push(parent);
  }
}
function expandTags(tags) {
  const out = new Set(tags);
  const stack = [...tags];
  while (stack.length) {
    for (const p of parentsOf.get(stack.pop()) || []) {
      if (!out.has(p)) { out.add(p); stack.push(p); }
    }
  }
  return out;
}
for (const e of all) e.allTags = expandTags(e.tags);

// word -> every word that means the same
const synonymOf = new Map();
for (const set of synonyms) for (const w of set) synonymOf.set(w, set.filter(x => x !== w));

// ---------- validate ----------

// check the db for mistakes and report them in the console
(function validate() {
  const seen = new Set();
  const warn = (...a) => console.warn("wing db:", ...a);
  for (const e of all) {
    if (seen.has(e.id)) warn("duplicate id", e.id);
    seen.add(e.id);
    if (!(e.flight in flightModes)) warn("unknown flight mode", e.id, e.flight);
    if (!(e.material in materials)) warn("unknown material", e.id, e.material);
    for (const [k, list] of Object.entries(scales)) {
      if (e[k] === undefined && optional.has(k)) continue;
      if (!list.includes(e[k])) warn("bad scale value", e.id, k, e[k]);
    }
    if (e.span && !(e.span[0] > 0 && e.span[0] <= e.span[1])) warn("bad span", e.id, e.span);
  }
  for (const [env, ids] of Object.entries(environments)) for (const id of ids) if (!byId.has(id)) warn("environment " + env + " for missing id", id);
  for (const [id, f] of Object.entries(fluidOf)) if (!(f in fluids)) warn("unknown fluid", id, f);
  for (const [name, table] of [["span", spans], ["era", eraOf], ["facts", facts], ["tag patch", tagPatches], ["parts", parts], ["tradeoffs", tradeoffs], ["fluid", fluidOf]]) {
    for (const id in table) if (!byId.has(id)) warn(name + " for missing id", id);
  }
  for (const [a, , b] of links) if (!byId.has(a) || !byId.has(b)) warn("broken link", a, b);
  for (const id in traitOverrides) if (!byId.has(id)) warn("override for missing id", id);
})();

// ---------- counts ----------

// collect every value seen for a field, with counts
function tally(get) {
  const counts = new Map();
  for (const e of all) for (const v of get(e)) counts.set(v, (counts.get(v) || 0) + 1);
  return [...counts].sort((a, b) => a[0].localeCompare(b[0]));
}

// ---------- search index ----------

// searchable text for each entry, split by field so field:value queries work
const fields = {
  name: e => e.name,
  note: e => e.note,
  group: e => e.group + " " + e.subgroup,
  flight: e => e.flight,
  material: e => e.material,
  tag: e => [...e.allTags].join(" "),
  example: e => e.examples.join(" "),
  size: e => e.size,
  speed: e => e.speed,
  aspect: e => e.aspect,
  era: e => e.era || "",
  fact: e => e.facts.join(" "),
  env: e => e.env.join(" "),
  part: e => e.partNames.join(" "),
  pro: e => e.pros.join(" "),
  con: e => e.cons.join(" "),
  flow: e => e.flow || "",
  fluid: e => e.fluid,
  id: e => e.id
};
// how much a hit in each field counts toward the score
const weights = { name: 5, id: 4, tag: 3, example: 3, env: 2, part: 2, group: 2, flight: 2, material: 2, flow: 1, fluid: 1, size: 1, speed: 1, aspect: 1, era: 1, note: 1, pro: 1, con: 1, fact: 0.5 };

// ---------- measurements ----------

// meters in each unit the search understands
const units = { mm: 0.001, cm: 0.01, m: 1, km: 1000 };

// read "10", "10m", or "2.5cm" as meters. returns null if it is not a length
function toMeters(text) {
  const m = /^(\d+(?:\.\d+)?)(mm|cm|m|km)?$/.exec(text);
  return m ? parseFloat(m[1]) * units[m[2] || "m"] : null;
}

// show a length in the unit that reads best
function fmtLen(m) {
  const [u, f] = m >= 1000 ? ["km", 1000] : m >= 1 ? ["m", 1] : m >= 0.01 ? ["cm", 0.01] : ["mm", 0.001];
  return +(m / f).toPrecision(3) + " " + u;
}
const fmtSpan = s => s[0] === s[1] ? fmtLen(s[0]) : `${fmtLen(s[0])} to ${fmtLen(s[1])}`;

// the middle of a range on a log scale, since spans run from bristles to buildings
const midSpan = s => Math.sqrt(s[0] * s[1]);

// median of a list of numbers
function median(list) {
  const s = [...list].sort((a, b) => a - b);
  const h = s.length >> 1;
  return s.length % 2 ? s[h] : (s[h - 1] + s[h]) / 2;
}

// 1 -> "1st", 2 -> "2nd", 13 -> "13th"
const ordinal = n => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");

const tokenize = s => s.toLowerCase().split(/[^a-z0-9-]+/).filter(Boolean);

const index = new Map(all.map(e => {
  const f = {};
  for (const k in fields) f[k] = fields[k](e).toLowerCase();
  f.tokens = tokenize(Object.values(f).join(" "));
  f.words = new Set(f.tokens);
  f.tf = new Map();
  for (const w of f.tokens) f.tf.set(w, (f.tf.get(w) || 0) + 1);
  return [e.id, f];
}));

// bm25 ranking: rewards a word showing up often in one entry, rare words, and short entries
const bm25 = (() => {
  const k1 = 1.2, b = 0.75;
  const n = index.size;
  const avg = [...index.values()].reduce((s, f) => s + f.tokens.length, 0) / n;
  const df = new Map();
  for (const f of index.values()) for (const w of f.words) df.set(w, (df.get(w) || 0) + 1);
  return (word, f) => {
    // count prefix matches too, so "glid" still counts "glider"
    let tf = 0, d = 0;
    for (const [w, c] of f.tf) if (w.startsWith(word)) tf += c;
    if (!tf) return 0;
    for (const [w, c] of df) if (w.startsWith(word)) d = Math.max(d, c);
    const idf = Math.log(1 + (n - d + 0.5) / (d + 0.5));
    return idf * tf * (k1 + 1) / (tf + k1 * (1 - b + b * f.tokens.length / avg));
  };
})();

// inverted index: word -> ids, used to skip entries that cannot match
const postings = new Map();
for (const [id, f] of index) {
  for (const w of f.words) {
    if (!postings.has(w)) postings.set(w, new Set());
    postings.get(w).add(id);
  }
}

// ---------- link graph ----------

// the reverse wording for each link type, so links read both ways
const reverse = {
  "inspired": "was inspired by",
  "same idea": "same idea",
  "evolved like": "evolved like",
  "part of": "has part",
  "replaced": "was replaced by"
};

const graph = new Map(all.map(e => [e.id, []]));
for (const [a, type, b] of links) {
  if (!graph.has(a) || !graph.has(b)) continue;
  graph.get(a).push({ to: b, type });
  graph.get(b).push({ to: a, type: reverse[type] || type });
}

// breadth-first walk out from one entry, cached since the graph never changes
const walkCache = new Map();
function walk(start, maxDepth = 3) {
  const key = start + "/" + maxDepth;
  if (walkCache.has(key)) return walkCache.get(key);
  const found = new Map([[start, { depth: 0, path: [start] }]]);
  let edge = [start];
  for (let d = 1; d <= maxDepth && edge.length; d++) {
    const next = [];
    for (const id of edge) {
      for (const { to } of graph.get(id)) {
        if (found.has(to)) continue;
        found.set(to, { depth: d, path: [...found.get(id).path, to] });
        next.push(to);
      }
    }
    edge = next;
  }
  found.delete(start);
  walkCache.set(key, found);
  return found;
}

// split the graph into connected clusters, used for stats in the detail view
const clusterOf = new Map();
{
  let n = 0;
  for (const e of all) {
    if (clusterOf.has(e.id) || !graph.get(e.id).length) continue;
    n++;
    clusterOf.set(e.id, n);
    for (const id of walk(e.id, Infinity).keys()) clusterOf.set(id, n);
  }
}
const clusterSize = id => [...clusterOf.values()].filter(c => c === clusterOf.get(id)).length;

// ---------- similarity ----------

// tf-idf vectors over tags, material, flight, and note words. rare features count more
const docs = all.map(e => [
  ...[...e.allTags].map(t => "tag:" + t),
  "material:" + e.material,
  "flight:" + e.flight,
  "size:" + e.size,
  "speed:" + e.speed,
  ...tokenize(e.note).filter(w => w.length > 3).map(w => "word:" + w)
]);
const docFreq = new Map();
for (const d of docs) for (const t of new Set(d)) docFreq.set(t, (docFreq.get(t) || 0) + 1);

const vectors = new Map(all.map((e, i) => {
  const tf = new Map();
  for (const t of docs[i]) tf.set(t, (tf.get(t) || 0) + 1);
  const v = new Map();
  let len = 0;
  for (const [t, n] of tf) {
    const w = n * Math.log(all.length / docFreq.get(t));
    v.set(t, w);
    len += w * w;
  }
  return [e.id, { v, len: Math.sqrt(len) || 1 }];
}));

function cosine(a, b) {
  const A = vectors.get(a), B = vectors.get(b);
  let dot = 0;
  for (const [t, w] of A.v) if (B.v.has(t)) dot += w * B.v.get(t);
  return dot / (A.len * B.len);
}

// related entries mix text similarity with closeness in the link graph
function related(entry, limit = 6) {
  const near = walk(entry.id, 3);
  return all
    .filter(e => e.id !== entry.id)
    .map(e => {
      const hop = near.get(e.id);
      return { e, score: cosine(entry.id, e.id) * 5 + (hop ? 2 / hop.depth : 0) };
    })
    .filter(x => x.score > 0.8)
    .sort((a, b) => b.score - a.score || a.e.name.localeCompare(b.e.name))
    .slice(0, limit)
    .map(x => x.e);
}

// ---------- query parsing ----------

// edit distance between two words, stopping early once it passes the limit
function distance(a, b, limit = 2) {
  if (Math.abs(a.length - b.length) > limit) return limit + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > limit) return limit + 1;
    prev = cur;
  }
  return prev[b.length];
}

// read "5000", "5k", "2.5m" (million), or "1e5" as a plain number
function toNumber(text) {
  const m = /^(\d+(?:\.\d+)?(?:e\d+)?)(k|m)?$/.exec(text);
  return m ? parseFloat(m[1]) * ({ k: 1e3, m: 1e6 }[m[2]] || 1) : null;
}

// fields that hold numbers or number ranges, and how to read a typed value for each
const numeric = {
  span: { get: e => e.span, read: toMeters },
  re: { get: e => e.re === null ? null : [e.re, e.re], read: toNumber }
};

// turn the search box into groups of terms. groups are split by | and mean "or".
// inside a group every term must match. supports "phrases", -not, field:value, and scale compares like size>=large
function parse(text) {
  return text.toLowerCase().split("|").map(part => {
    const terms = [];
    const re = /(-)?(?:(\w+)(:|>=|<=|>|<|=))?(?:"([^"]+)"|(\S+))/g;
    let m;
    while ((m = re.exec(part))) {
      const [, not, key, op, phrase, bare] = m;
      const word = phrase || bare || "";
      if (!word) continue;
      if (key in numeric && op !== ":" && numeric[key].read(word) !== null) {
        terms.push({ not: !!not, num: key, op, value: numeric[key].read(word) });
      } else if (key && op !== ":" && key in scales) {
        terms.push({ not: !!not, scale: key, op, value: word.replace(/-/g, " ") });
      } else if (key && key in fields) {
        terms.push({ not: !!not, field: key, word, phrase: !!phrase });
      } else {
        terms.push({ not: !!not, field: null, word: key ? key + op + word : word, phrase: !!phrase });
      }
    }
    return terms;
  }).filter(g => g.length);
}

// compare two positions on an ordered scale
const compare = { ">": (a, b) => a > b, "<": (a, b) => a < b, ">=": (a, b) => a >= b, "<=": (a, b) => a <= b, "=": (a, b) => a === b };

// score one term against one entry. exact hits beat synonyms, synonyms beat typos. 0 means no match
function termScore(term, e, f) {
  // number compares check if any part of the entry's range fits
  if (term.num) {
    const range = numeric[term.num].get(e);
    if (!range) return 0;
    const [lo, hi] = range, v = term.value;
    const ok = { ">": hi > v, ">=": hi >= v, "<": lo < v, "<=": lo <= v, "=": lo <= v && v <= hi }[term.op];
    return ok ? 1 : 0;
  }
  if (term.scale) {
    const list = scales[term.scale];
    const want = list.indexOf(term.value);
    if (want < 0) return 0;
    return compare[term.op](list.indexOf(e[term.scale]), want) ? 1 : 0;
  }
  const places = term.field ? [term.field] : Object.keys(fields);
  const hit = w => places.reduce((best, k) => f[k].includes(w) ? Math.max(best, weights[k]) : best, 0);

  let best = hit(term.word);
  // plain words also get a bm25 bonus so the best entries in a subgroup float up
  if (best && !term.field && !term.phrase) best += bm25(term.word, f);
  if (!best && !term.phrase) {
    for (const s of synonymOf.get(term.word) || []) best = Math.max(best, hit(s) * 0.7);
  }
  // allow small typos on single longer words
  if (!best && !term.phrase && !term.field && term.word.length >= 4) {
    const limit = term.word.length >= 7 ? 2 : 1;
    for (const w of f.words) if (distance(term.word, w, limit) <= limit) { best = 0.5; break; }
  }
  return best;
}

// score one group of terms, or -1 if any term fails
function groupScore(group, e, f) {
  let total = 0;
  for (const t of group) {
    const s = termScore(t, e, f);
    if (t.not ? s > 0 : s === 0) return -1;
    total += t.not ? 0 : s;
  }
  return total;
}

// best score over all "or" groups, or -1 if none match. no query means everything matches
function score(e, groups) {
  if (!groups.length) return 0;
  const f = index.get(e.id);
  return Math.max(-1, ...groups.map(g => groupScore(g, e, f)));
}

// quick pre-filter using the inverted index. only safe for plain exact words with no field
function candidates(groups) {
  if (groups.length !== 1) return null;
  const plain = groups[0].filter(t => !t.not && !t.field && !t.scale && !t.phrase && postings.has(t.word) && !synonymOf.has(t.word));
  if (!plain.length) return null;
  let set = null;
  for (const t of plain) {
    const ids = new Set();
    for (const [w, list] of postings) if (w.includes(t.word)) for (const id of list) ids.add(id);
    set = set ? new Set([...set].filter(id => ids.has(id))) : ids;
  }
  return set;
}

// every plain word in the db, for "did you mean" hints
const vocab = [...postings.keys()].filter(w => w.length > 2 && !/\d/.test(w));

// for each plain word that matches nothing, find the closest real word
function suggest(groups) {
  const fixes = [];
  for (const g of groups) {
    for (const t of g) {
      if (t.not || t.scale || t.num || t.phrase || t.field) continue;
      if (vocab.some(w => w.includes(t.word)) || synonymOf.has(t.word)) continue;
      let best = null, bestD = 3;
      for (const w of vocab) {
        const d = distance(t.word, w, 2);
        if (d < bestD || (d === bestD && best && postings.get(w).size > postings.get(best).size)) { best = w; bestD = d; }
      }
      if (best) fixes.push([t.word, best]);
    }
  }
  return fixes;
}

// ---------- form state ----------

const form = document.getElementById("filters");
const keys = ["q", "group", "flight", "tag", "sort", "view"];

function state() {
  const f = new FormData(form);
  const s = Object.fromEntries(keys.map(k => [k, f.get(k) || ""]));
  s.groups = parse(s.q);
  return s;
}

// keep filters in the url so a view can be shared or reloaded
function save(s) {
  const p = new URLSearchParams();
  for (const k of keys) if (s[k] && !(k === "sort" && s[k] === "default") && !(k === "view" && s[k] === "list")) p.set(k, s[k]);
  const qs = p.toString();
  history.replaceState(null, "", (qs ? "?" + qs : location.pathname) + location.hash);
}
function load() {
  const p = new URLSearchParams(location.search);
  for (const k of keys) if (p.has(k)) form.elements[k].value = p.get(k);
}

function passes(e, s) {
  return (!s.group || e.group === s.group) &&
    (!s.flight || e.flight === s.flight) &&
    (!s.tag || e.allTags.has(s.tag));
}

const byName = (a, b) => a.name.localeCompare(b.name);
const byScale = k => (a, b) => scales[k].indexOf(a[k]) - scales[k].indexOf(b[k]) || byName(a, b);
const sorters = {
  name: byName,
  flight: (a, b) => a.flight.localeCompare(b.flight) || byName(a, b),
  material: (a, b) => a.material.localeCompare(b.material) || byName(a, b),
  tags: (a, b) => b.tags.length - a.tags.length || byName(a, b),
  size: byScale("size"),
  speed: byScale("speed"),
  // entries with no span or era go last
  span: (a, b) => (a.span ? midSpan(a.span) : Infinity) - (b.span ? midSpan(b.span) : Infinity) || byName(a, b),
  era: (a, b) => (a.era ? eras.indexOf(a.era) : eras.length) - (b.era ? eras.indexOf(b.era) : eras.length) || byName(a, b),
  re: (a, b) => (a.re ?? Infinity) - (b.re ?? Infinity) || byName(a, b)
};

// ---------- html helpers ----------

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const link = e => `<a href="#${e.id}">${esc(e.name)}</a>`;

// explain glossary words by hovering, longest terms first so phrases win
const glossRe = new RegExp("\\b(" + Object.keys(glossary).sort((a, b) => b.length - a.length).join("|") + ")\\b", "g");
const gloss = text => esc(text).replace(glossRe, w => `<abbr title="${esc(glossary[w])}">${w}</abbr>`);

// fill a select box with options and counts
function fill(name, pairs, label = v => v) {
  const sel = form.elements[name];
  for (const [v, n] of pairs) sel.add(new Option(`${label(v)} (${n})`, v));
}
fill("group", tally(e => [e.group]));
fill("flight", tally(e => [e.flight]));
fill("tag", tally(e => e.allTags), t => t in tagParents ? t + " (all)" : t);
for (const k of ["size", "speed", "span", "era"]) form.elements.sort.add(new Option("by " + k, k));
form.elements.sort.add(new Option("by flow (reynolds)", "re"));

const out = document.getElementById("out");
const count = document.getElementById("count");

// ---------- views ----------

// list view: grouped under headings, best matches first inside each subgroup
function drawList(rows) {
  const groups = new Map();
  for (const r of rows) {
    const key = r.e.group + "\u0000" + r.e.subgroup;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  }
  let html = "", lastG;
  for (const list of groups.values()) {
    const { group, subgroup } = list[0].e;
    if (group !== lastG) { html += `<h2>${esc(group)}</h2>`; lastG = group; }
    html += `<h3>${esc(subgroup)}</h3>`;
    list.sort((a, b) => b.score - a.score);
    for (const { e } of list) html += `<p>${link(e)}: ${gloss(e.note)}</p>`;
  }
  return html;
}

// table view: one row per entry
function drawTable(rows) {
  const cols = [
    ["name", e => link(e)],
    ["group", e => esc(e.group)],
    ["flight", e => esc(e.flight)],
    ["material", e => esc(e.material)],
    ["size", e => esc(e.size)],
    ["speed", e => esc(e.speed)],
    ["aspect", e => esc(e.aspect)],
    ["span", e => e.span ? fmtSpan(e.span) : ""],
    ["era", e => esc(e.era || "")],
    ["tags", e => esc(e.tags.join(", "))]
  ];
  return `<table border="1" cellpadding="4"><tr>${cols.map(([h]) => `<th>${h}</th>`).join("")}</tr>` +
    rows.map(({ e }) => `<tr>${cols.map(([, f]) => `<td>${f(e)}</td>`).join("")}</tr>`).join("") +
    `</table>`;
}

// where an entry ranks among all entries on one scale, like "4th of 20 large wings"
function scaleNote(e, k) {
  const same = all.filter(x => x[k] === e[k]).length;
  return `${esc(e[k])} (${same} wings share this)`;
}

// span line with rank inside the group and compared to the group median
function spanNote(e) {
  if (!e.span) return "unknown";
  const peers = all.filter(x => x.group === e.group && x.span);
  const rank = [...peers].sort((a, b) => b.span[1] - a.span[1]).indexOf(e) + 1;
  const med = median(peers.map(x => midSpan(x.span)));
  const ratio = midSpan(e.span) / med;
  const vs = ratio > 1.5 ? `about ${Math.round(ratio)}x the group middle` : ratio < 0.67 ? `about 1/${Math.round(1 / ratio)} of the group middle` : "near the group middle";
  return `${fmtSpan(e.span)}. ${ordinal(rank)} widest of ${peers.length} in ${esc(e.group)}, ${vs} (${fmtLen(med)}).`;
}

// era line with the entries that came just before and after
function eraNote(e) {
  if (!e.era) return "unknown";
  const i = eras.indexOf(e.era);
  const peers = all.filter(x => x.era === e.era).length - 1;
  const around = [eras[i - 1] && "after " + eras[i - 1], eras[i + 1] && "before " + eras[i + 1]].filter(Boolean).join(", ");
  return `${esc(e.era)} (${around}). ${peers} other wings from this time.`;
}

// big numbers written short, like 1.2k or 3.4m
function fmtNum(n) {
  if (n >= 1e6) return +(n / 1e6).toPrecision(2) + "m";
  if (n >= 1e3) return +(n / 1e3).toPrecision(2) + "k";
  return +n.toPrecision(2) + "";
}

// flow line: the number, its band, and which other wings sit nearest on a log scale
function flowNote(e) {
  if (e.re === null) return "unknown (needs a span and a speed above still)";
  const band = bandOf(e.re);
  const near = all
    .filter(x => x.re !== null && x.id !== e.id)
    .map(x => ({ x, d: Math.abs(Math.log10(x.re) - Math.log10(e.re)) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3)
    .map(({ x }) => link(x));
  return `about ${fmtNum(e.re)} in ${esc(e.fluid)} (${esc(band.name)}): ${esc(band.note)} closest: ${near.join(", ")}.`;
}

// draw a parts tree as nested lists
function drawParts(tree) {
  return `<ul>${tree.map(n => Array.isArray(n)
    ? `<li>${esc(n[0])}${drawParts(n[1])}</li>`
    : `<li>${esc(n)}</li>`).join("")}</ul>`;
}

// other wings that share an environment, counted per environment
function envNote(e) {
  if (!e.env.length) return "unknown";
  return e.env.map(env => `${esc(env)} (${environments[env].length - 1} others)`).join(", ");
}

// detail view for one entry, opened by #id in the url
function drawDetail(e) {
  const m = materials[e.material];
  const direct = graph.get(e.id);
  const far = [...walk(e.id, 3)].filter(([, v]) => v.depth > 1).sort((a, b) => a[1].depth - b[1].depth);
  const pathText = path => path.map(id => link(byId.get(id))).join(" &rarr; ");
  const sameMaterial = all.filter(x => x.material === e.material && x.id !== e.id).length;
  const rel = related(e);
  const parents = [...e.allTags].filter(t => !e.tags.includes(t));

  return `<p><a href="#">back</a></p>
<h2>${esc(e.name)}</h2>
<dl>
<dt>group</dt><dd>${esc(e.group)} / ${esc(e.subgroup)}</dd>
<dt>about</dt><dd>${gloss(e.note)}</dd>
<dt>examples</dt><dd>${esc(e.examples.join(", "))}</dd>
<dt>flight</dt><dd>${esc(e.flight)}: ${esc(flightModes[e.flight] || "")}</dd>
<dt>material</dt><dd>${esc(e.material)}${m ? ` (${m.origin}, ${m.weight}, ${m.stiffness} stiffness): ${esc(m.note)} used by ${sameMaterial} other wings.` : ""}</dd>
<dt>size</dt><dd>${scaleNote(e, "size")}</dd>
<dt>speed</dt><dd>${scaleNote(e, "speed")}</dd>
<dt>aspect</dt><dd>${scaleNote(e, "aspect")}</dd>
<dt>span</dt><dd>${spanNote(e)}</dd>
<dt>first seen</dt><dd>${eraNote(e)}</dd>
<dt>tags</dt><dd>${esc(e.tags.join(", "))}${parents.length ? ` (also counts as: ${esc(parents.join(", "))})` : ""}</dd>
<dt>found in</dt><dd>${envNote(e)}</dd>
<dt>flow</dt><dd>${flowNote(e)}</dd>
<dt>link cluster</dt><dd>${clusterOf.has(e.id) ? `connected to ${clusterSize(e.id) - 1} other wings` : "not linked to any wing"}</dd>
</dl>
${e.parts.length ? `<h3>parts</h3>\n${drawParts(e.parts)}` : ""}
${e.pros.length || e.cons.length ? `<h3>good and bad</h3>\n<ul>${e.pros.map(p => `<li>+ ${esc(p)}</li>`).join("")}${e.cons.map(c => `<li>- ${esc(c)}</li>`).join("")}</ul>` : ""}
${e.facts.length ? `<h3>facts</h3>\n<ul>${e.facts.map(f => `<li>${gloss(f)}</li>`).join("")}</ul>` : ""}
<h3>links</h3>
<ul>${direct.map(l => `<li>${esc(l.type)} ${link(byId.get(l.to))}</li>`).join("") || "<li>none</li>"}</ul>
<h3>further links</h3>
<ul>${far.map(([, v]) => `<li>${pathText(v.path)}</li>`).join("") || "<li>none</li>"}</ul>
<h3>related</h3>
<ul>${rel.map(r => `<li>${link(r)} (<a href="#${e.id},${r.id}">compare</a>)</li>`).join("") || "<li>none</li>"}</ul>`;
}

// side by side view for two entries, opened by #a,b in the url
function drawCompare(a, b) {
  const rows = [
    ["group", e => esc(e.group + " / " + e.subgroup)],
    ["about", e => gloss(e.note)],
    ["flight", e => esc(e.flight)],
    ["material", e => esc(e.material)],
    ["size", e => esc(e.size)],
    ["speed", e => esc(e.speed)],
    ["aspect", e => esc(e.aspect)],
    ["span", e => e.span ? fmtSpan(e.span) : "unknown"],
    ["first seen", e => esc(e.era || "unknown")],
    ["found in", e => esc(e.env.join(", ") || "unknown")],
    ["flow", e => e.re === null ? "unknown" : `${fmtNum(e.re)} (${esc(e.flow)})`],
    ["good", e => esc(e.pros.join(", ") || "none listed")],
    ["bad", e => esc(e.cons.join(", ") || "none listed")],
    ["parts", e => esc(e.partNames.join(", ") || "none listed")],
    ["tags", e => esc(e.tags.join(", "))]
  ];
  // how many times wider one is than the other
  const spanRatio = a.span && b.span
    ? (r => r > 0.8 && r < 1.25 ? "about the same width" : r >= 1 ? `${a.name} is about ${+r.toPrecision(2)}x as wide` : `${b.name} is about ${+(1 / r).toPrecision(2)}x as wide`)(midSpan(a.span) / midSpan(b.span))
    : "unknown";
  const shared = a.tags.filter(t => b.tags.includes(t));
  const hop = walk(a.id, 6).get(b.id);
  return `<p><a href="#${a.id}">back</a></p>
<h2>${esc(a.name)} vs ${esc(b.name)}</h2>
<table border="1" cellpadding="4">
<tr><th></th><th>${link(a)}</th><th>${link(b)}</th></tr>
${rows.map(([h, f]) => `<tr><th>${h}</th><td>${f(a)}</td><td>${f(b)}</td></tr>`).join("\n")}
</table>
<p>shared tags: ${esc(shared.join(", ") || "none")}</p>
<p>width: ${esc(spanRatio)}</p>
<p>shared parts: ${esc(a.partNames.filter(p => b.partNames.includes(p)).join(", ") || "none")}</p>
<p>shared places: ${esc(a.env.filter(p => b.env.includes(p)).join(", ") || "none")}</p>
<p>similarity: ${Math.round(cosine(a.id, b.id) * 100)}%</p>
<p>link path: ${hop ? hop.path.map(id => link(byId.get(id))).join(" &rarr; ") : "none"}</p>`;
}

function draw() {
  const ids = decodeURIComponent(location.hash.slice(1)).split(",").map(id => byId.get(id));
  const picked = ids.every(Boolean) ? ids : [];
  form.hidden = picked.length > 0;
  if (picked.length) {
    count.textContent = "";
    out.innerHTML = picked.length >= 2 ? drawCompare(picked[0], picked[1]) : drawDetail(picked[0]);
    return;
  }

  const s = state();
  save(s);
  const pool = candidates(s.groups);
  const rows = all
    .filter(e => (!pool || pool.has(e.id)) && passes(e, s))
    .map(e => ({ e, score: score(e, s.groups) }))
    .filter(r => r.score >= 0);

  // any sort other than by group switches to the table
  const sorted = s.sort in sorters;
  if (sorted) rows.sort((a, b) => sorters[s.sort](a.e, b.e));
  else if (s.view === "table" && s.groups.length) rows.sort((a, b) => b.score - a.score);

  const hint = rows.length ? [] : suggest(s.groups);
  count.textContent = `${rows.length} of ${all.length} wings` +
    (hint.length ? `. did you mean: ${hint.map(([, to]) => to).join(", ")}?` : "");
  out.innerHTML = !rows.length ? "<p>no wings found.</p>"
    : s.view === "table" || sorted ? drawTable(rows)
    : drawList(rows);
}

load();
form.addEventListener("input", draw);
form.addEventListener("reset", () => setTimeout(draw));
form.addEventListener("submit", ev => ev.preventDefault());
window.addEventListener("hashchange", () => { draw(); scrollTo(0, 0); });
draw();
