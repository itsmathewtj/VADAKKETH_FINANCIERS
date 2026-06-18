(function() {
  "use strict";

  const hero = document.querySelector(".finance-hero");
  if (!hero) return;

  const backgroundSlides = hero.querySelectorAll(".finance-hero-slide");
  const title = hero.querySelector(".finance-hero-title");
  const copy = hero.querySelector(".finance-hero-copy");
  if (!backgroundSlides.length || !title || !copy) return;

  const slides = [
    {
      title: {
        en: "Trusted finance support<br>for local families.",
        ml: "വിശ്വാസം, സേവനം,<br>ലളിതത്വം എന്നിവയിൽ പടുത്തുയർത്തിയ ധനകാര്യം."
      },
      copy: {
        en: "Clear, customer-friendly lending for farmers, workers, families and local businesses, with simple guidance from the branch team.",
        ml: "വാഴൂർ, കോട്ടയം പ്രദേശങ്ങളിലെ കർഷകർ, ചെറുകിട വ്യാപാരികൾ, തൊഴിലാളികൾ, കുടുംബങ്ങൾ, പ്രാദേശിക സംരംഭങ്ങൾ എന്നിവരുടെ അടിയന്തര സാമ്പത്തിക ആവശ്യങ്ങൾക്ക് സുതാര്യവും ഉപഭോക്തൃ സൗഹൃദവുമായ വായ്പാ സേവനങ്ങളിലൂടെ വടക്കേത്ത് ഫൈനാൻസിയേഴ്സ് പിന്തുണ നൽകുന്നു."
      }
    },
    {
      title: {
        en: "Gold loan support<br>with clear guidance.",
        ml: "വ്യക്തവും കരുതലുമുള്ള<br>സ്വർണ്ണ വായ്പാ പിന്തുണ."
      },
      copy: {
        en: "Practical assistance against gold ornaments, with careful handling, simple documents and clear terms before every transaction.",
        ml: "സ്വർണ്ണാഭരണങ്ങൾക്ക് എതിരായി സൂക്ഷ്മമായ കൈകാര്യം, ലളിതമായ രേഖകൾ, ഓരോ ഇടപാടിനും മുമ്പ് വ്യക്തമായ നിബന്ധനകൾ എന്നിവയോടെ പ്രായോഗിക വായ്പാ സഹായം നേടുക."
      }
    },
    {
      title: {
        en: "Business finance support<br>for local traders.",
        ml: "പ്രാദേശിക ബിസിനസുകൾക്ക്<br>പ്രായോഗിക ധനസഹായം."
      },
      copy: {
        en: "Working capital support for traders, shop owners and entrepreneurs, with a simple process and respectful branch guidance.",
        ml: "ചെറുകിട വ്യാപാരികൾക്കും കടയുടമകൾക്കും പ്രാദേശിക സംരംഭകർക്കും പ്രവർത്തന മൂലധന ആവശ്യങ്ങൾ ലളിതവും മാന്യവുമായ നടപടിക്രമത്തിൽ ചർച്ച ചെയ്യാം."
      }
    },
    {
      title: {
        en: "Personal finance support<br>for family needs.",
        ml: "കുടുംബങ്ങൾക്ക് ആവശ്യമുള്ളപ്പോൾ<br>വ്യക്തിഗത ധനസഹായം."
      },
      copy: {
        en: "Helpful loan guidance for family needs, emergency expenses and daily requirements, with clear options and friendly service.",
        ml: "കുടുംബ ആവശ്യങ്ങൾക്കും അടിയന്തര ചെലവുകൾക്കും ദൈനംദിന സാമ്പത്തിക ആവശ്യങ്ങൾക്കും വ്യക്തമായ ഓപ്ഷനുകളും സൗഹൃദ സേവനവുമോടെ ബ്രാഞ്ച് ടീം മാർഗ്ഗനിർദേശം നൽകുന്നു."
      }
    }
  ];

  const intervalMs = 5000;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentIndex = 0;
  let timerId = null;

  function currentLanguage() {
    return localStorage.getItem("vadakketh-language") === "ml" ? "ml" : "en";
  }

  function renderContent(index) {
    const language = currentLanguage();
    const slide = slides[index];
    title.dataset.en = slide.title.en;
    title.dataset.ml = slide.title.ml;
    copy.dataset.en = slide.copy.en;
    copy.dataset.ml = slide.copy.ml;
    title.innerHTML = slide.title[language];
    copy.textContent = slide.copy[language];
  }

  function activateSlide(index, animateText) {
    currentIndex = index;
    backgroundSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    if (!animateText || prefersReducedMotion) {
      renderContent(index);
      return;
    }

    hero.classList.add("is-changing");
    window.setTimeout(() => {
      renderContent(index);
      hero.classList.remove("is-changing");
    }, 140);
  }

  function nextSlide() {
    activateSlide((currentIndex + 1) % slides.length, true);
  }

  activateSlide(0, false);

  if (!prefersReducedMotion && slides.length > 1) {
    timerId = window.setInterval(nextSlide, intervalMs);
  }

  document.querySelectorAll(".language-select").forEach((select) => {
    select.addEventListener("change", () => {
      window.setTimeout(() => renderContent(currentIndex), 0);
    });
  });

  window.addEventListener("pagehide", () => {
    if (timerId) window.clearInterval(timerId);
  });
})();
