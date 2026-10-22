document.addEventListener("DOMContentLoaded", () => {
  const viewsContainer = document.getElementById("views-container");
  const tabsContainer = document.getElementById("tabs-container");
  if (!viewsContainer || !tabsContainer) return;

  let viewsHtml = "";
  let tabsHtml = "";

  APP_DATA.workouts.forEach((section, index) => {
    const isFirst = index === 0;
    const viewId = `view-${section.id}`;
    
    viewsHtml += `
      <section class="view" id="${viewId}" ${isFirst ? "" : "hidden"} aria-label="${section.name}">
        <div class="wk-head"><h1 class="wk-title">${section.name}</h1></div>
        <p style="color: var(--muted); margin-bottom: 16px;">${section.meta}</p>
        <ul class="ex-list">
    `;

    section.exercises.forEach(ex => {
      viewsHtml += `
          <li class="ex">
            <div>
              <h3>${ex.name} <span class="ss">${ex.ss}</span></h3>
              <p class="rx"><strong>דגש:</strong> ${ex.rx}</p>
              <p style="margin-top: 6px; color: var(--text-main);">${ex.notes}</p>
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
        <svg viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/></svg>
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
