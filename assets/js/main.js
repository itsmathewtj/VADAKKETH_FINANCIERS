/**
* Template Name: Selecao
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Send enquiry forms to WhatsApp with submitted details
   */
  document.querySelectorAll('.enquiry-form').forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const phone = formData.get('phone') || '';
      const email = formData.get('email') || '';
      const service = formData.get('subject') || '';
      const message = formData.get('message') || '';
      const whatsappMessage = [
        'Hello Vadakketh Financiers, I would like to send an enquiry.',
        'Please review my details and guide me with the next steps, required documents and available loan options.',
        'I am interested in getting clear information about eligibility, process and repayment details.',
        '',
        'Customer Details:',
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service: ${service}`,
        `Message: ${message}`
      ].join('\n');

      window.location.href = `https://wa.me/919745438332?text=${encodeURIComponent(whatsappMessage)}`;
    }, true);
  });

  /**
   * Footer contact links
   */
  document.querySelectorAll('.footer-contact-list').forEach(contactList => {
    contactList.innerHTML = `
      <li>
        <i class="bi bi-geo-alt"></i>
        <a href="https://maps.app.goo.gl/9Tqo2V56pm9uhSDN7?g_st=ic" target="_blank" rel="noopener">Pulickalkavala, 14th Mile, Vazhoor, Kottayam, Kerala</a>
      </li>
      <li>
        <i class="bi bi-telephone"></i>
        <a href="tel:+919745438332">+91 97454 38332</a>
      </li>
      <li>
        <i class="bi bi-whatsapp"></i>
        <a href="https://wa.me/919745438332" target="_blank" rel="noopener">+91 97454 38332</a>
      </li>
      <li>
        <i class="bi bi-envelope"></i>
        <a href="mailto:vadakethfinancers@gmail.com">vadakethfinancers@gmail.com</a>
      </li>
    `;
  });

  /**
   * Fixed quick contact buttons
   */
  const quickContact = document.createElement('nav');
  quickContact.className = 'quick-contact';
  quickContact.setAttribute('aria-label', 'Quick contact');
  quickContact.innerHTML = `
    <a href="tel:+919745438332" class="quick-contact-link quick-contact-phone" aria-label="Call Vadakketh Financiers">
      <i class="bi bi-telephone-fill" aria-hidden="true"></i>
    </a>
    <a href="https://wa.me/919745438332" class="quick-contact-link quick-contact-whatsapp" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <i class="bi bi-whatsapp" aria-hidden="true"></i>
    </a>
    <a href="mailto:vadakethfinancers@gmail.com" class="quick-contact-link quick-contact-email" aria-label="Send email">
      <i class="bi bi-envelope-fill" aria-hidden="true"></i>
    </a>
  `;
  document.body.appendChild(quickContact);

})();
