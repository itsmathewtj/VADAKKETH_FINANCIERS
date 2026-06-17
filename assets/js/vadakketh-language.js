(function() {
  "use strict";

  const languageSelects = document.querySelectorAll(".language-select");
  if (!languageSelects.length) return;

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
  }

  setLanguage(storedLanguage);
  languageSelects.forEach((select) => {
    select.addEventListener("change", (event) => setLanguage(event.target.value));
  });
})();
