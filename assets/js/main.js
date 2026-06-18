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
   * Add contextual service images across the finance pages
   */
  function addVisualServiceShowcase() {
    if (!document.body.classList.contains('index-page') && !document.body.classList.contains('page-body')) return;

    const main = document.querySelector('main.main');
    if (!main || main.querySelector('.visual-service-showcase')) return;

    const pageName = window.location.pathname.split('/').pop() || 'index.html';
    const defaultShowcase = {
      eyebrow: 'Service Gallery',
      title: 'A closer look at the finance support we provide',
      copy: 'Images from gold loans, personal finance, business support and branch service moments help customers understand the services at a glance.',
      images: [
        ['assets/img/14.png', 'Gold loan assistance', 'Cash support against pledged gold ornaments.'],
        ['assets/img/18.png', 'Business growth support', 'Working capital support for small traders.'],
        ['assets/img/20.png', 'Personal loan guidance', 'Simple assistance for family financial needs.'],
        ['assets/img/21.png', 'Family finance support', 'Practical help for household priorities.']
      ]
    };

    const showcases = {
      'index.html': defaultShowcase,
      'about.html': {
        eyebrow: 'Local Trust',
        title: 'Built around real customer situations',
        copy: 'The visual stories show the people, service moments and financial needs that shape Vadakketh Financiers every day.',
        images: [
          ['assets/img/21.png', 'Family confidence', 'Support for household goals and responsibilities.'],
          ['assets/img/15.png', 'Community lending', 'Finance built around local customer needs.'],
          ['assets/img/22.png', 'Urgent support', 'Respectful guidance during difficult moments.']
        ]
      },
      'services.html': {
        eyebrow: 'Loan Services',
        title: 'Gold, business and personal finance in one place',
        copy: 'Customers can quickly understand each service through visuals before choosing the right loan option.',
        images: [
          ['assets/img/14.png', 'Gold Loans', 'Quick support against gold ornaments.'],
          ['assets/img/18.png', 'Business Loans', 'Growth and working-capital support.'],
          ['assets/img/20.png', 'Personal Loans', 'Practical help for family needs.']
        ]
      },
      'gold-loan.html': {
        eyebrow: 'Gold Loan Visuals',
        title: 'Gold valuation and pledge support made clearer',
        copy: 'These images highlight gold ornaments, value checks and cash assistance so customers know what the service is about.',
        images: [
          ['assets/img/14.png', 'Gold to cash support', 'Loan assistance against pledged ornaments.'],
          ['assets/img/16.png', 'Value assessment', 'Careful valuation before loan guidance.'],
          ['assets/img/17.png', 'Gold market view', 'Gold value awareness for informed decisions.']
        ]
      },
      'business-loan.html': {
        eyebrow: 'Business Finance',
        title: 'Support for working capital and growth',
        copy: 'Business customers can see how the service connects to growth plans, cash flow and branch-level guidance.',
        images: [
          ['assets/img/18.png', 'Growth support', 'Capital support for expanding local trade.'],
          ['assets/img/15.png', 'Community finance', 'Customer-focused finance for local needs.'],
          ['assets/img/19.png', 'Branch transactions', 'Clear payment and cash handling support.']
        ]
      },
      'personal-loan.html': {
        eyebrow: 'Personal Finance',
        title: 'Support for family and emergency needs',
        copy: 'The images make personal loan use cases easier to understand for families planning urgent expenses.',
        images: [
          ['assets/img/20.png', 'Loan approval guidance', 'Simple support for planned personal needs.'],
          ['assets/img/21.png', 'Family priorities', 'Finance support for household goals.'],
          ['assets/img/22.png', 'Urgent expenses', 'Guidance when families need quick help.']
        ]
      },
      'corporate.html': {
        eyebrow: 'Modern Finance',
        title: 'Traditional trust with modern service systems',
        copy: 'The gallery connects customer relationships, branch service and future-ready finance operations.',
        images: [
          ['assets/img/15.png', 'Customer-centered finance', 'Services shaped around customer needs.'],
          ['assets/img/19.png', 'Branch service', 'Cash and payment support with care.'],
          ['assets/img/18.png', 'Growth direction', 'A practical vision for wider finance access.']
        ]
      },
      'policy.html': {
        eyebrow: 'Fair Practice',
        title: 'Clear handling, valuation and customer care',
        copy: 'Policy principles become easier to understand when customers can see the service situations behind them.',
        images: [
          ['assets/img/16.png', 'Clear valuation', 'Responsible assessment before lending.'],
          ['assets/img/19.png', 'Careful transactions', 'Structured branch-level cash handling.'],
          ['assets/img/15.png', 'Customer care', 'Finance support with accountability.']
        ]
      },
      'contact.html': {
        eyebrow: 'Before You Contact',
        title: 'Choose the service you want to discuss',
        copy: 'The branch can guide customers on gold, business or personal loan enquiries based on their requirement.',
        images: [
          ['assets/img/14.png', 'Gold loan enquiry', 'Ask about pledging gold ornaments.'],
          ['assets/img/18.png', 'Business loan enquiry', 'Discuss working capital or growth support.'],
          ['assets/img/20.png', 'Personal loan enquiry', 'Share family or urgent finance needs.']
        ]
      },
      'emi-calculator.html': {
        eyebrow: 'Gold Calculator',
        title: 'Understand gold value before enquiry',
        copy: 'Gold loan images beside the calculator help customers connect the estimate with valuation and pledge support.',
        images: [
          ['assets/img/16.png', 'Gold value estimate', 'Estimate loan eligibility from gold weight.'],
          ['assets/img/17.png', 'Gold market context', 'Understand value before visiting the branch.'],
          ['assets/img/14.png', 'Loan support', 'Convert pledged gold into practical finance.']
        ]
      }
    };

    const showcase = showcases[pageName] || defaultShowcase;
    const section = document.createElement('section');
    section.className = 'visual-service-showcase section';
    section.innerHTML = `
      <div class="container">
        <div class="visual-showcase-heading" data-aos="fade-up">
          <span>${showcase.eyebrow}</span>
          <h2>${showcase.title}</h2>
          <p>${showcase.copy}</p>
        </div>
        <div class="visual-showcase-grid">
          ${showcase.images.map((image, index) => `
            <article class="visual-showcase-card" data-aos="fade-up" data-aos-delay="${index * 100}">
              <img src="${image[0]}" alt="${image[1]}" loading="lazy">
              <div>
                <h3>${image[1]}</h3>
                <p>${image[2]}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
    main.appendChild(section);
  }

  addVisualServiceShowcase();

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
