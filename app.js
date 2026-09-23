// draws the list and handles searching
const list = document.getElementById("list");
const search = document.getElementById("search");

function draw(filter) {
  const q = filter.trim().toLowerCase();
  list.innerHTML = "";
  for (const [group, items] of Object.entries(wings)) {
    const shown = items.filter(w => (w.name + " " + w.note).includes(q));
    if (!shown.length) continue;
    const section = document.createElement("section");
    section.innerHTML = `<h2>${group} <span>${shown.length}</span></h2>`;
    for (const w of shown) {
      const item = document.createElement("div");
      item.className = "wing";
      item.innerHTML = `<h3>${w.name}</h3><p>${w.note}</p>`;
      section.appendChild(item);
    }
    list.appendChild(section);
  }
  if (!list.children.length) list.innerHTML = "<p class='empty'>no wings found.</p>";
}

search.addEventListener("input", () => draw(search.value));
draw("");
