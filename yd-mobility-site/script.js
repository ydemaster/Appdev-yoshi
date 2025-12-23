(function () {
  const inventoryRoot = document.querySelector("[data-inventory]");
  if (!inventoryRoot) return;

  const cards = Array.from(document.querySelectorAll("[data-card]"));
  const q = document.getElementById("q");
  const make = document.getElementById("make");
  const status = document.getElementById("status");

  function norm(s) {
    return (s || "").toLowerCase().trim();
  }

  function apply() {
    const query = norm(q?.value);
    const makeVal = norm(make?.value);
    const statusVal = norm(status?.value);

    let shown = 0;

    cards.forEach((card) => {
      const text = norm(card.getAttribute("data-text"));
      const cardMake = norm(card.getAttribute("data-make"));
      const cardStatus = norm(card.getAttribute("data-status"));

      const okQuery = !query || text.includes(query);
      const okMake = !makeVal || makeVal === "all" || cardMake === makeVal;
      const okStatus = !statusVal || statusVal === "all" || cardStatus === statusVal;

      const visible = okQuery && okMake && okStatus;
      card.style.display = visible ? "" : "none";
      if (visible) shown++;
    });

    const count = document.getElementById("count");
    if (count) count.textContent = String(shown);
  }

  [q, make, status].forEach((el) => el && el.addEventListener("input", apply));
  apply();
})();
