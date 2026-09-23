// flattens the db, builds indexes and a link graph, and draws everything with plain html

// ---------- flatten and index ----------

// flatten nested groups into one list, keeping where each entry came from
const all = wings.flatMap(g =>
  g.subgroups.flatMap(s =>
    s.entries.map(e => ({ ...e, group: g.group, subgroup: s.name }))
  )
);
const byId = new Map(all.map(e => [e.id, e]));

// check the db for mistakes and report them in the console
(function validate() {
  const seen = new Set();
  for (const e of all) {
    if (seen.has(e.id)) console.warn("duplicate id:", e.id);
    seen.add(e.id);
    if (!(e.flight in flightModes)) console.warn("unknown flight mode:", e.id, e.flight);
    if (!(e.material in materials)) console.warn("unknown material:", e.id, e.material);
  }
  for (const [a, , b] of links) {
    if (!byId.has(a) || !byId.has(b)) console.warn("broken link:", a, b);
  }
})();

// collect every value seen for a field, with counts
function tally(field) {
  const counts = new Map();
  for (const e of all) {
    for (const v of [].concat(e[field])) counts.set(v, (counts.get(v) || 0) + 1);
  }
  return [...counts].sort((a, b) => a[0].localeCompare(b[0]));
}

// searchable text for each entry, split by field so field:value queries work
const fields = {
  name: e => e.name,
  note: e => e.note,
  group: e => e.group + " " + e.subgroup,
  flight: e => e.flight,
  material: e => e.material,
  tag: e => e.tags.join(" "),
  example: e => e.examples.join(" "),
  id: e => e.id
};
// how much a hit in each field counts toward the score
const weights = { name: 5, id: 4, tag: 3, example: 3, group: 2, flight: 2, material: 2, note: 1 };

const index = new Map(all.map(e => {
  const f = {};
  for (const k in fields) f[k] = fields[k](e).toLowerCase();
  f.words = new Set(Object.values(f).join(" ").split(/[^a-z0-9-]+/).filter(Boolean));
  return [e.id, f];
}));

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

// breadth-first walk out from one entry, returning distance and path to each reached entry
function walk(start, maxDepth = 3) {
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
  return found;
}

// ---------- similarity ----------

// share of tags two entries have in common
function jaccard(a, b) {
  const A = new Set(a), B = new Set(b);
  let both = 0;
  for (const x of A) if (B.has(x)) both++;
  return both / (A.size + B.size - both || 1);
}

// related entries score on tags, same subgroup, material, flight, and closeness in the graph
function related(entry, limit = 6) {
  const near = walk(entry.id, 3);
  return all
    .filter(e => e.id !== entry.id)
    .map(e => {
      const hop = near.get(e.id);
      const score =
        jaccard(entry.tags, e.tags) * 4 +
        (e.subgroup === entry.subgroup ? 1 : 0) +
        (e.material === entry.material ? 0.5 : 0) +
        (e.flight === entry.flight ? 0.5 : 0) +
        (hop ? 3 / hop.depth : 0);
      return { e, score };
    })
    .filter(x => x.score > 1)
    .sort((a, b) => b.score - a.score || a.e.name.localeCompare(b.e.name))
    .slice(0, limit)
    .map(x => x.e);
}

// ---------- search ----------

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

// turn the search box into terms. supports "quoted phrases", -not, and field:value
function parse(text) {
  const terms = [];
  const re = /(-)?(?:(\w+):)?(?:"([^"]+)"|(\S+))/g;
  let m;
  while ((m = re.exec(text.toLowerCase()))) {
    const field = m[2] && m[2] in fields ? m[2] : null;
    const word = m[3] || m[4] || "";
    if (!word) continue;
    terms.push({ not: !!m[1], field, word: m[2] && !field ? m[2] + ":" + word : word, phrase: !!m[3] });
  }
  return terms;
}

// score one term against one entry. exact hits beat fuzzy ones. 0 means no match
function termScore(term, f) {
  const places = term.field ? [term.field] : Object.keys(fields);
  let best = 0;
  for (const k of places) {
    if (f[k].includes(term.word)) best = Math.max(best, weights[k]);
  }
  // allow small typos on single longer words
  if (!best && !term.phrase && term.word.length >= 4 && !term.field) {
    const limit = term.word.length >= 7 ? 2 : 1;
    for (const w of f.words) if (distance(term.word, w, limit) <= limit) { best = 0.5; break; }
  }
  return best;
}

// total score for an entry, or -1 if it should be hidden
function score(e, terms) {
  const f = index.get(e.id);
  let total = 0;
  for (const t of terms) {
    const s = termScore(t, f);
    if (t.not ? s > 0 : s === 0) return -1;
    total += s;
  }
  return total;
}

// ---------- form state ----------

const form = document.getElementById("filters");
const keys = ["q", "group", "flight", "tag", "sort", "view"];

function state() {
  const f = new FormData(form);
  const s = Object.fromEntries(keys.map(k => [k, f.get(k) || ""]));
  s.terms = parse(s.q);
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
    (!s.tag || e.tags.includes(s.tag));
}

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  flight: (a, b) => a.flight.localeCompare(b.flight) || a.name.localeCompare(b.name),
  material: (a, b) => a.material.localeCompare(b.material) || a.name.localeCompare(b.name),
  tags: (a, b) => b.tags.length - a.tags.length || a.name.localeCompare(b.name)
};

// ---------- html helpers ----------

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const link = e => `<a href="#${e.id}">${esc(e.name)}</a>`;

// explain glossary words by hovering, longest terms first so phrases win
const glossRe = new RegExp("\\b(" + Object.keys(glossary).sort((a, b) => b.length - a.length).join("|") + ")\\b", "g");
const gloss = text => esc(text).replace(glossRe, w => `<abbr title="${esc(glossary[w])}">${w}</abbr>`);

// fill a select box with options and counts
function fill(name, pairs) {
  const sel = form.elements[name];
  for (const [v, n] of pairs) sel.add(new Option(`${v} (${n})`, v));
}
fill("group", tally("group"));
fill("flight", tally("flight"));
fill("tag", tally("tags"));

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
  const head = ["name", "group", "subgroup", "flight", "material", "tags"];
  return `<table border="1" cellpadding="4"><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>` +
    rows.map(({ e }) => `<tr><td>${link(e)}</td><td>${esc(e.group)}</td><td>${esc(e.subgroup)}</td>` +
      `<td>${esc(e.flight)}</td><td>${esc(e.material)}</td><td>${esc(e.tags.join(", "))}</td></tr>`).join("") +
    `</table>`;
}

// detail view for one entry, opened by #id in the url
function drawDetail(e) {
  const m = materials[e.material];
  const direct = graph.get(e.id);
  const far = [...walk(e.id, 3)].filter(([, v]) => v.depth > 1).sort((a, b) => a[1].depth - b[1].depth);
  const pathText = path => path.map(id => link(byId.get(id))).join(" &rarr; ");
  const sameMaterial = all.filter(x => x.material === e.material && x.id !== e.id).length;

  return `<p><a href="#">back</a></p>
<h2>${esc(e.name)}</h2>
<dl>
<dt>group</dt><dd>${esc(e.group)} / ${esc(e.subgroup)}</dd>
<dt>about</dt><dd>${gloss(e.note)}</dd>
<dt>examples</dt><dd>${esc(e.examples.join(", "))}</dd>
<dt>flight</dt><dd>${esc(e.flight)}: ${esc(flightModes[e.flight] || "")}</dd>
<dt>material</dt><dd>${esc(e.material)}${m ? ` (${m.origin}, ${m.weight}, ${m.stiffness} stiffness): ${esc(m.note)} used by ${sameMaterial} other wings.` : ""}</dd>
<dt>tags</dt><dd>${esc(e.tags.join(", "))}</dd>
</dl>
<h3>links</h3>
<ul>${direct.map(l => `<li>${esc(l.type)} ${link(byId.get(l.to))}</li>`).join("") || "<li>none</li>"}</ul>
<h3>further links</h3>
<ul>${far.map(([, v]) => `<li>${pathText(v.path)}</li>`).join("") || "<li>none</li>"}</ul>
<h3>related</h3>
<ul>${related(e).map(r => `<li>${link(r)}</li>`).join("") || "<li>none</li>"}</ul>`;
}

function draw() {
  const picked = byId.get(location.hash.slice(1));
  form.hidden = !!picked;
  if (picked) { count.textContent = ""; out.innerHTML = drawDetail(picked); return; }

  const s = state();
  save(s);
  const rows = all
    .filter(e => passes(e, s))
    .map(e => ({ e, score: score(e, s.terms) }))
    .filter(r => r.score >= 0);

  // any sort other than by group switches to the table
  const sorted = s.sort in sorters;
  if (sorted) rows.sort((a, b) => sorters[s.sort](a.e, b.e));
  else if (s.view === "table" && s.terms.length) rows.sort((a, b) => b.score - a.score);

  count.textContent = `${rows.length} of ${all.length} wings`;
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
