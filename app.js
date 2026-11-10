document.addEventListener("DOMContentLoaded", () => {
  const viewsContainer = document.getElementById("views-container");
  const tabsContainer = document.getElementById("tabs-container");
  if (!viewsContainer || !tabsContainer) return;

  let viewsHtml = "";
  let tabsHtml = "";

  const tabIcons = {
    "routine": "bone.png",
    "behavior": "home.png",
    "health": "medicine.png"
  };

  APP_DATA.workouts.forEach((section, index) => {
    const isFirst = index === 0;
    const viewId = `view-${section.id}`;
    const iconFileName = tabIcons[section.id] || "bone.png";
    
    viewsHtml += `
      <section class="view" id="${viewId}" ${isFirst ? "" : "hidden"} aria-label="${section.name}">
        <div class="wk-head"><h1 class="wk-title">${section.name}</h1></div>
        <p style="color: var(--muted); margin-bottom: 16px;">${section.meta}</p>
        <ul class="ex-list">
    `;

    section.exercises.forEach(ex => {
      // בדיקה האם זה סעיף האוכל כדי להוסיף את שתי התמונות המיוחדות
      let extraImagesHtml = "";
      if (ex.id === "food") {
        extraImagesHtml = `
          <div class="food-images-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px;">
            <div style="text-align: center;">
              <img src="food-95g.png" alt="מנה מדויקת - 95 גרם" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);" />
              <span style="font-size: 13px; color: var(--cocoa); font-weight: 700; display: block; margin-top: 4px;">כמות מדויקת: 95 גרם ✅</span>
            </div>
            <div style="text-align: center;">
              <img src="food-80g.png" alt="דוגמה לא טובה - 80 גרם" style="width: 100%; border-radius: 8px; border: 1px solid var(--line);" />
              <span style="font-size: 13px; color: #dc2626; font-weight: 700; display: block; margin-top: 4px;">דוגמה שגויה: 80 גרם ❌</span>
            </div>
          </div>
        `;
      }

      viewsHtml += `
          <li class="ex">
            <div>
              <h3>${ex.name} <span class="ss">${ex.ss}</span></h3>
              <p class="rx"><strong>דגש:</strong> ${ex.rx}</p>
              <p style="margin-top: 6px; color: var(--text-main);">${ex.notes}</p>
              ${extraImagesHtml}
            </div>
            <button class="check" aria-label="סמן נקרא" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </button>
          </li>
      `;
    });

    viewsHtml += `</ul></section>`;

    tabsHtml += `
      <a href="#${section.id}" data-target="${viewId}" ${isFirst ? 'aria-current="page"' : ''}>
        <img src="${iconFileName}" alt="${section.name}" class="tab-icon" />
        ${section.name}
      </a>
    `;
  });

  viewsContainer.innerHTML = viewsHtml;
  tabsContainer.innerHTML = tabsHtml;

  const tabLinks = tabsContainer.querySelectorAll("a");
  const viewSections = viewsContainer.querySelectorAll(".view");

  tabLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");

      viewSections.forEach(sec => sec.hidden = true);
      document.getElementById(targetId).hidden = false;

      tabLinks.forEach(l => l.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "page");

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});
