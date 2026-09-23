// flattens the db, builds an index, and draws everything with plain html

// flatten nested groups into one list, keeping where each entry came from
const all = wings.flatMap(g =>
  g.subgroups.flatMap(s =>
    s.entries.map(e => ({ ...e, group: g.group, subgroup: s.name }))
  )
);
const byId = new Map(all.map(e => [e.id, e]));

// collect every value seen for a field, with counts
function tally(field) {
  const counts = new Map();
  for (const e of all) {
    for (const v of [].concat(e[field])) counts.set(v, (counts.get(v) || 0) + 1);
  }
  return [...counts].sort((a, b) => a[0].localeCompare(b[0]));
}

// build a search string for each entry once
const haystack = new Map(all.map(e => [e.id,
  [e.name, e.note, e.group, e.subgroup, e.flight, e.material, ...e.tags, ...e.examples].join(" ").toLowerCase()
]));

// find entries that share the most tags with a given one
function related(entry, limit = 5) {
  const mine = new Set(entry.tags);
  return all
    .filter(e => e.id !== entry.id)
    .map(e => ({ e, score: e.tags.filter(t => mine.has(t)).length + (e.subgroup === entry.subgroup ? 1 : 0) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || a.e.name.localeCompare(b.e.name))
    .slice(0, limit)
    .map(x => x.e);
}

// read the current filters from the form
const form = document.getElementById("filters");
function state() {
  const f = new FormData(form);
  return {
    words: (f.get("q") || "").toLowerCase().split(/\s+/).filter(Boolean),
    group: f.get("group"),
    flight: f.get("flight"),
    tag: f.get("tag"),
    sort: f.get("sort"),
    view: f.get("view")
  };
}

// every search word must match somewhere, and every chosen filter must match
function matches(e, s) {
  if (s.group && e.group !== s.group) return false;
  if (s.flight && e.flight !== s.flight) return false;
  if (s.tag && !e.tags.includes(s.tag)) return false;
  const text = haystack.get(e.id);
  return s.words.every(w => text.includes(w));
}

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  flight: (a, b) => a.flight.localeCompare(b.flight) || a.name.localeCompare(b.name),
  material: (a, b) => a.material.localeCompare(b.material) || a.name.localeCompare(b.name),
  tags: (a, b) => b.tags.length - a.tags.length || a.name.localeCompare(b.name)
};

// escape text before putting it into html
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const link = e => `<a href="#${e.id}">${esc(e.name)}</a>`;

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

// list view: grouped under headings
function drawList(rows) {
  let html = "", lastG, lastS;
  for (const e of rows) {
    if (e.group !== lastG) { html += `<h2>${esc(e.group)}</h2>`; lastG = e.group; lastS = null; }
    if (e.subgroup !== lastS) { html += `<h3>${esc(e.subgroup)}</h3>`; lastS = e.subgroup; }
    html += `<p>${link(e)}: ${esc(e.note)}</p>`;
  }
  return html;
}

// table view: one row per entry
function drawTable(rows) {
  const head = ["name", "group", "subgroup", "flight", "material", "tags"];
  return `<table border="1" cellpadding="4"><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr>` +
    rows.map(e => `<tr><td>${link(e)}</td><td>${esc(e.group)}</td><td>${esc(e.subgroup)}</td>` +
      `<td>${esc(e.flight)}</td><td>${esc(e.material)}</td><td>${esc(e.tags.join(", "))}</td></tr>`).join("") +
    `</table>`;
}

// detail view for one entry, opened by #id in the url
function drawDetail(e) {
  return `<p><a href="#">back</a></p>
<h2>${esc(e.name)}</h2>
<dl>
<dt>group</dt><dd>${esc(e.group)} / ${esc(e.subgroup)}</dd>
<dt>about</dt><dd>${esc(e.note)}</dd>
<dt>examples</dt><dd>${esc(e.examples.join(", "))}</dd>
<dt>flight</dt><dd>${esc(e.flight)}</dd>
<dt>material</dt><dd>${esc(e.material)}</dd>
<dt>tags</dt><dd>${esc(e.tags.join(", "))}</dd>
</dl>
<h3>related</h3>
<ul>${related(e).map(r => `<li>${link(r)}</li>`).join("") || "<li>none</li>"}</ul>`;
}

function draw() {
  const picked = byId.get(location.hash.slice(1));
  form.hidden = !!picked;
  if (picked) { count.textContent = ""; out.innerHTML = drawDetail(picked); return; }

  const s = state();
  const rows = all.filter(e => matches(e, s));
  // any sort other than by group switches to the table
  const sorted = s.sort in sorters;
  if (sorted) rows.sort(sorters[s.sort]);
  count.textContent = `${rows.length} of ${all.length} wings`;
  out.innerHTML = !rows.length ? "<p>no wings found.</p>"
    : s.view === "table" || sorted ? drawTable(rows)
    : drawList(rows);
}

form.addEventListener("input", draw);
form.addEventListener("reset", () => setTimeout(draw));
form.addEventListener("submit", ev => ev.preventDefault());
window.addEventListener("hashchange", () => { draw(); scrollTo(0, 0); });
draw();
