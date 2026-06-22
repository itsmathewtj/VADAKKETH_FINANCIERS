(function() {
  "use strict";

  const languageSelects = document.querySelectorAll(".language-select");
  if (!languageSelects.length) return;

  const languageToggleButtons = [];
  const headerContainer = document.querySelector("#header .container-fluid");
  const logo = headerContainer?.querySelector(".logo");
  if (headerContainer && logo && !headerContainer.querySelector(".language-switcher")) {
    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.setAttribute("aria-label", "Language switcher");
    switcher.innerHTML = `
      <div class="language-switcher-buttons" role="group" aria-label="Choose language">
        <button type="button" class="language-switcher-button" data-language-toggle="en" aria-label="English">
          <span class="language-switcher-letter">A</span>
        </button>
        <button type="button" class="language-switcher-button" data-language-toggle="ml" aria-label="Malayalam">
          <span class="language-switcher-letter">മ</span>
        </button>
      </div>
    `;
    logo.insertAdjacentElement("afterend", switcher);
    switcher.querySelectorAll("[data-language-toggle]").forEach((button) => {
      languageToggleButtons.push(button);
      button.addEventListener("click", () => setLanguage(button.getAttribute("data-language-toggle")));
    });
  }

  const storedLanguage = localStorage.getItem("vadakketh-language") || "en";

  function setLanguage(language) {
    document.documentElement.lang = language === "ml" ? "ml" : "en";
    document.body.classList.toggle("malayalam", language === "ml");

    document.querySelectorAll("[data-en]").forEach((element) => {
      const value = element.dataset[language];
      if (!value) return;
      if (element.dataset.html === "true") {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-placeholder-en]").forEach((element) => {
      const key = language === "ml" ? "placeholderMl" : "placeholderEn";
      const value = element.dataset[key];
      if (value) element.setAttribute("placeholder", value);
    });

    localStorage.setItem("vadakketh-language", language);
    languageSelects.forEach((select) => {
      select.value = language;
    });
    languageToggleButtons.forEach((button) => {
      button.classList.toggle("active", button.getAttribute("data-language-toggle") === language);
      button.setAttribute("aria-pressed", button.getAttribute("data-language-toggle") === language ? "true" : "false");
    });
  }

  setLanguage(storedLanguage);
  languageSelects.forEach((select) => {
    select.addEventListener("change", (event) => setLanguage(event.target.value));
  });
})();
