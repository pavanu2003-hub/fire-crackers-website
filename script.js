// ═══════════════════════════════════════════════════════════════
//  HOSUR SARAVANA CRACKERS — script.js
//  Modules: Navbar | SmoothScroll | ScrollReveal | Animation
//           Products | Filter | Search | Enquiry | WhatsApp
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── 0. CONSTANTS ─────────────────────────────────────────────
  // TODO: Replace with the actual WhatsApp number (country code + number, no spaces or dashes)
  var WHATSAPP_NUMBER = '919741513004';
  var NAV_SCROLL_THRESHOLD = 80;
  var SEARCH_DEBOUNCE_MS = 300;

  // ─── 1. PRODUCTS DATA ──────────────────────────────────────────
  var products = [
    // SPARKLERS
    { id:1,  name:'Gold Sparklers 15 CM',               category:'sparklers', mrp:506,   price:127,   label:'Popular',      tagClass:'tag--gold',     image:'Crackers/golden sparkles.webp',                        tall:false },
    { id:2,  name:'Export Gold Sparklers 20 CM',        category:'sparklers', mrp:425,   price:106,   label:'Popular',      tagClass:'tag--gold',     image:'Crackers/golden sparkles.webp',                        tall:false },
    { id:3,  name:'Gold Sparklers 30 CM',               category:'sparklers', mrp:506,   price:127,   label:'Popular',      tagClass:'tag--gold',     image:'Crackers/golden sparkles.webp',                        tall:false },
    { id:4,  name:'Crackling Sparklers 15 CM',          category:'sparklers', mrp:565,   price:141,   label:'Crackling',    tagClass:'tag--orange',   image:'Crackers/crackling.jpg',                               tall:false },
    { id:5,  name:'Export Crackling Sparklers 20 CM',   category:'sparklers', mrp:537,   price:134,   label:'Crackling',    tagClass:'tag--orange',   image:'Crackers/crackling.jpg',                               tall:false },
    { id:6,  name:'Crackling Sparklers 30 CM',          category:'sparklers', mrp:565,   price:141,   label:'Crackling',    tagClass:'tag--orange',   image:'Crackers/crackling.jpg',                               tall:false },
    { id:7,  name:'Red Colour Sparklers 12 CM',         category:'sparklers', mrp:308,   price:77,    label:'Coloured',     tagClass:'tag--red',      image:'Crackers/red sparkle.webp',                            tall:false },
    { id:8,  name:'4 Colour Sparklers 12 CM',           category:'sparklers', mrp:286,   price:72,    label:'Coloured',     tagClass:'tag--red',      image:'Crackers/4-colour-sparklers.svg',                      tall:false },
    { id:9,  name:'Tri Color Sparklers 15 CM',          category:'sparklers', mrp:1493,  price:373,   label:'Tri Color',    tagClass:'tag--gold',     image:'Crackers/tri color.webp',                              tall:false },
    { id:10, name:'Lemon Tree Sparklers 15 CM',         category:'sparklers', mrp:428,   price:107,   label:'Unique',       tagClass:'tag--gold',     image:'Crackers/Lemon tree.jpg',                              tall:false },
    { id:11, name:'Lavender Sparklers 15 CM',           category:'sparklers', mrp:596,   price:149,   label:'Fragrant',     tagClass:'tag--gold',     image:'Crackers/lavender fountain.jpg',                       tall:false },
    { id:12, name:'Twinkling Star 45 CM',               category:'sparklers', mrp:323,   price:81,    label:'Twinkling',    tagClass:'tag--gold',     image:'Crackers/twinkling star.jpg',                          tall:false },
    { id:13, name:'Silver Twinklings Deluxe 120 CM',    category:'sparklers', mrp:1075,  price:269,   label:'Deluxe',       tagClass:'tag--dark',     image:'Crackers/silver twinkling.jpg',                        tall:false },
    { id:14, name:'4 Colour Torches',                   category:'sparklers', mrp:1386,  price:347,   label:'Coloured',     tagClass:'tag--orange',   image:'Crackers/4 color torches.jpg',                         tall:false },

    // SOUND CRACKERS
    { id:15, name:'Krishna 10 CM',                      category:'ground',    mrp:236,   price:59,    label:'Classic',      tagClass:'tag--cream',    image:'Crackers/krishna-10cm.svg',                            tall:false },
    { id:16, name:'Hercules Deluxe 10 CM',              category:'ground',    mrp:304,   price:76,    label:'Deluxe',       tagClass:'tag--cream',    image:'Crackers/hercules-10cm.svg',                           tall:false },

    // BIJILI
    { id:17, name:"Bijili Crackers Red 50's",           category:'ground',    mrp:214,   price:54,    label:'Traditional',  tagClass:'tag--gold',     image:'Crackers/bijili cracker.webp',                         tall:false },
    { id:18, name:'Bijili Crackers Red',                category:'ground',    mrp:408,   price:102,   label:'Traditional',  tagClass:'tag--gold',     image:'Crackers/bijili cracker.webp',                         tall:false },

    // ATOM BOMBS
    { id:19, name:'Hydrogen Bombs Green',               category:'ground',    mrp:644,   price:161,   label:'Powerful',     tagClass:'tag--red',      image:'Crackers/hydrogen green.jpg',                          tall:false },
    { id:20, name:'Thunder Bomb Green',                 category:'ground',    mrp:905,   price:226,   label:'Thunder',      tagClass:'tag--red',      image:'Crackers/thunder green',                               tall:false },
    { id:21, name:'Boom',                               category:'ground',    mrp:1216,  price:304,   label:'Loud!',        tagClass:'tag--red',      image:'Crackers/boom-cracker.svg',                            tall:false },

    // FLOWER POTS & FOUNTAINS
    { id:22, name:'Flower Pots Big',                    category:'ground',    mrp:960,   price:240,   label:'Fountain',     tagClass:'tag--orange',   image:'Crackers/flower pots.jpg',                             tall:false },
    { id:23, name:'Flower Pots Special',                category:'ground',    mrp:1277,  price:319,   label:'Special',      tagClass:'tag--orange',   image:'Crackers/flowerpot-special.jpg',                       tall:false },
    { id:24, name:'Flower Pots Giant',                  category:'ground',    mrp:2649,  price:662,   label:'Giant',        tagClass:'tag--gold',     image:'Crackers/flower pots.jpg',                             tall:false  },
    { id:25, name:'Flower Pots Deluxe',                 category:'ground',    mrp:1722,  price:431,   label:'Deluxe',       tagClass:'tag--gold',     image:'Crackers/flower pot delux.jpg',                        tall:false },
    { id:26, name:'Tri Color Fountains (Millennium)',   category:'ground',    mrp:3151,  price:788,   label:'Tri Color',    tagClass:'tag--gold',     image:'Crackers/tri color fountains.jpg',                     tall:false  },
    { id:27, name:'Red Cinderella',                     category:'ground',    mrp:3235,  price:809,   label:'Premium',      tagClass:'tag--dark',     image:'Crackers/red cindrella.jpg',                           tall:false },
    { id:28, name:'Lavender Fountain',                  category:'ground',    mrp:2505,  price:626,   label:'Fountain',     tagClass:'tag--orange',   image:'Crackers/lavender fountain.jpg',                       tall:false },
    { id:29, name:'Colour World',                       category:'ground',    mrp:3192,  price:798,   label:'Colourful',    tagClass:'tag--orange',   image:'Crackers/color world.jpg',                             tall:false },
    { id:30, name:'Crackling King',                     category:'ground',    mrp:2856,  price:714,   label:'Crackling',    tagClass:'tag--orange',   image:'Crackers/crackling.jpg',                               tall:false },
    { id:31, name:'Cheers',                             category:'ground',    mrp:1353,  price:338,   label:'Popular',      tagClass:'tag--gold',     image:'Crackers/cheers-fountain.svg',                         tall:false },
    { id:32, name:'Jade Flowers',                       category:'ground',    mrp:1895,  price:474,   label:'Fancy',        tagClass:'tag--red',      image:'Crackers/Jade-Flower.jpg',                             tall:false },
    { id:33, name:'Jewel Pots',                         category:'ground',    mrp:1851,  price:463,   label:'Premium',      tagClass:'tag--dark',     image:'Crackers/jewel-pots.webp',                             tall:false },

    // ZAMIN CHAKKARS & WHEELS
    { id:34, name:'Zamin Chakkars Asoka',               category:'ground',    mrp:628,   price:157,   label:'Chakkar',      tagClass:'tag--gold',     image:'Crackers/Zamin-Chakkars-Ashoka.jpg',                   tall:false },
    { id:35, name:'Zamin Chakkar Special',              category:'ground',    mrp:1068,  price:267,   label:'Special',      tagClass:'tag--orange',   image:'Crackers/special-zamin-chakkar-cornation.jpg',          tall:false },
    { id:36, name:'Zamin Chakkars Deluxe',              category:'ground',    mrp:1381,  price:345,   label:'Deluxe',       tagClass:'tag--gold',     image:'Crackers/zamin-chakkar-deluxe-by-cornation.jpg',        tall:false },
    { id:37, name:'Zamin Chakkars Super Deluxe',        category:'ground',    mrp:1527,  price:382,   label:'Super Deluxe', tagClass:'tag--dark',     image:'Crackers/zamin-chakkar- super deluxe-by-cornation.jpg', tall:false },
    { id:38, name:'Red & White Chakkars',               category:'ground',    mrp:425,   price:106,   label:'Chakkar',      tagClass:'tag--red',      image:'Crackers/Red-and-White.webp',                          tall:false },
    { id:39, name:'Mega Twister',                       category:'ground',    mrp:977,   price:244,   label:'Twister',      tagClass:'tag--orange',   image:'Crackers/mega-twister.webp',                           tall:false },
    { id:40, name:'Scarlet Saucer',                     category:'ground',    mrp:668,   price:167,   label:'Fancy',        tagClass:'tag--red',      image:'Crackers/scarlet-saucer.webp',                         tall:false },
    { id:41, name:'Scary Scream',                       category:'ground',    mrp:1394,  price:349,   label:'Novelty',      tagClass:'tag--red',      image:'Crackers/scary-scream-mini.webp',                      tall:false },
    { id:42, name:'Whizz Wheel',                        category:'ground',    mrp:857,   price:214,   label:'Chakkar',      tagClass:'tag--gold',     image:'Crackers/whizz wheel.jpg',                             tall:false },
    { id:43, name:'Swastik Wheel',                      category:'ground',    mrp:2028,  price:507,   label:'Premium',      tagClass:'tag--dark',     image:'Crackers/swastik wheel.jpg',                           tall:false },

    // ROCKETS
    { id:44, name:'Rainbow Rockets',                    category:'rockets',   mrp:909,   price:227,   label:'Colourful',    tagClass:'tag--orange',   image:'Crackers/rainbow rockets.jpg',                         tall:false },
    { id:45, name:'Bomb Rockets',                       category:'rockets',   mrp:1003,  price:251,   label:'Powerful',     tagClass:'tag--red',      image:'Crackers/bomb-rockets.webp',                           tall:false },
    { id:46, name:'Rohini Rockets',                     category:'rockets',   mrp:1590,  price:398,   label:'Popular',      tagClass:'tag--gold',     image:'Crackers/rohini rocket.jpg',                           tall:false },
    { id:47, name:'Silver Jet Rockets',                 category:'rockets',   mrp:1585,  price:396,   label:'Silver',       tagClass:'tag--dark',     image:'Crackers/Silver-jet.jpg',                              tall:false },
    { id:48, name:'Parachute Rocket',                   category:'rockets',   mrp:4033,  price:1008,  label:'Premium',      tagClass:'tag--dark',     image:'Crackers/parachute rockets.jpg',                       tall:false  },

    // GIFT BOXES
    { id:49, name:'Gift Box — Great',                   category:'combo',     mrp:5934,  price:1484,  label:'Gift Box',     tagClass:'tag--gradient', image:'Crackers/gift-box-great.svg',                          tall:false },
    { id:50, name:'Gift Box — Wonderful',               category:'combo',     mrp:7016,  price:1754,  label:'Gift Box',     tagClass:'tag--gradient', image:'Crackers/gift-box-wonderful.svg',                      tall:false },
    { id:51, name:'Gift Box — Khushi',                  category:'combo',     mrp:9752,  price:2438,  label:'Gift Box',     tagClass:'tag--gradient', image:'Crackers/gift-box-khushi.svg',                         tall:false },
    { id:52, name:'Gift Box — Titan',                   category:'combo',     mrp:14446, price:3612,  label:'Gift Box',     tagClass:'tag--gradient', image:'Crackers/gift-box-titan.svg',                          tall:false  },
    { id:53, name:'Gift Box — Prestige Identity',       category:'combo',     mrp:25752, price:6438,  label:'Luxury',       tagClass:'tag--gradient', image:'Crackers/gift-box-prestige.svg',                       tall:false },

    // FANCY FIREWORKS
    { id:54, name:'Cluster Blaster',                    category:'novelty',   mrp:1093,  price:273,   label:'Fancy',        tagClass:'tag--red',      image:'Crackers/cluster blaster.jpg',                         tall:false },
    { id:55, name:'Snow Valley',                        category:'novelty',   mrp:896,   price:224,   label:'Fancy',        tagClass:'tag--red',      image:'Crackers/snow valley',                                 tall:false },
    { id:56, name:'Fat Boy',                            category:'novelty',   mrp:315,   price:79,    label:'Novelty',      tagClass:'tag--orange',   image:'Crackers/fat boy.jpg',                                 tall:false },
    { id:57, name:'Colour Changing Butterfly',          category:'novelty',   mrp:729,   price:182,   label:'Novelty',      tagClass:'tag--orange',   image:'Crackers/color changing butterfly.jpg',                tall:false },
    { id:58, name:'Golden Whistle',                     category:'novelty',   mrp:1171,  price:293,   label:'Novelty',      tagClass:'tag--gold',     image:'Crackers/golden-whistle.jpg',                          tall:false },
    { id:59, name:'Seven Shots',                        category:'novelty',   mrp:1230,  price:308,   label:'7 Shots',      tagClass:'tag--orange',   image:'Crackers/7 shots.jpg',                                 tall:false },
    { id:60, name:'Assorted Cartoons',                  category:'novelty',   mrp:542,   price:136,   label:'Fun!',         tagClass:'tag--gold',     image:'Crackers/cartoon crackers.webp',                       tall:false },

    // FESTIVE COLLECTION
    { id:61, name:'Rainbow Fog',                        category:'novelty',   mrp:3228,  price:807,   label:'Festive',      tagClass:'tag--orange',   image:'Crackers/rainbow fog.jpg',                             tall:false },
    { id:62, name:'Vibgyor',                            category:'novelty',   mrp:2510,  price:628,   label:'Festive',      tagClass:'tag--orange',   image:'Crackers/vibgyor.jpg',                                 tall:false },

    // 12 SHOTS
    { id:63, name:'Music Party (12 Shots)',             category:'novelty',   mrp:1850,  price:463,   label:'12 Shots',     tagClass:'tag--red',      image:'Crackers/12 shot music party.webp',                    tall:false },

    // SHOTS / CAKES
    { id:64, name:'Blue Thunder — 56 Shots',            category:'novelty',   mrp:9004,  price:2251,  label:'56 Shots',     tagClass:'tag--dark',     image:'Crackers/blue-thunder-56-shots.webp',                  tall:false  },
    { id:65, name:'Sensation — 100 Shots',              category:'novelty',   mrp:17634, price:4409,  label:'100 Shots',    tagClass:'tag--dark',     image:'Crackers/sensation.jpg',                               tall:false },
    { id:66, name:'Gold Bonanza — 125 Shots',           category:'novelty',   mrp:21658, price:5415,  label:'125 Shots',    tagClass:'tag--dark',     image:'Crackers/gold-bonanza-125-shots.webp',                 tall:false  },
    { id:67, name:'Speed 200 — 200 Shots',              category:'novelty',   mrp:30878, price:7720,  label:'200 Shots',    tagClass:'tag--dark',     image:'Crackers/speed-200.jpg',                               tall:false },
    { id:68, name:'Paradise — 250 Shots',               category:'novelty',   mrp:36103, price:9026,  label:'250 Shots',    tagClass:'tag--dark',     image:'Crackers/PARADISE-250.jpg',                            tall:false  },
    { id:69, name:'Panorama — 500 Shots',               category:'novelty',   mrp:86297, price:21574, label:'500 Shots',    tagClass:'tag--dark',     image:'Crackers/PANORAMA-500.jpg',                            tall:false },
    { id:70, name:"Oh! Kolkata! — 500 Shots",           category:'novelty',   mrp:75286, price:18822, label:'500 Shots',    tagClass:'tag--dark',     image:'Crackers/oh-kolkata-crackers.webp',                    tall:false  },

    // MAGIC CRACKERS
    { id:71, name:'Magic Crackers — 100',               category:'novelty',   mrp:611,   price:153,   label:'Magic',        tagClass:'tag--gold',     image:'Crackers/2fa30719dfc6a0319a7b007c7487f68a.jpg',        tall:false },
    { id:72, name:'Magic Crackers — 1000',              category:'novelty',   mrp:3730,  price:933,   label:'Magic',        tagClass:'tag--gold',     image:'Crackers/magic 1000.webp',                             tall:false },
    { id:73, name:'Magic Crackers — 2000',              category:'novelty',   mrp:7125,  price:1781,  label:'Magic',        tagClass:'tag--gold',     image:'Crackers/magic 2000.webp',                             tall:false },
    { id:74, name:'Magic Crackers — 5000',              category:'novelty',   mrp:16669, price:4167,  label:'Magic',        tagClass:'tag--gold',     image:'Crackers/magic 5000.webp',                             tall:false },
    { id:75, name:'Magic Crackers — 10000',             category:'novelty',   mrp:33260, price:8315,  label:'Magic',        tagClass:'tag--dark',     image:'Crackers/magic 10000.jpg',                             tall:false }
  ];

  // ─── 2. STATE ──────────────────────────────────────────────────
  var activeCategory = 'all';
  var searchDebounceTimer = null;
  var enquiryList = [];
  var isPanelOpen = false;

  // ─── 3. DOM REFERENCES ─────────────────────────────────────────
  var navbar        = document.getElementById('navbar');
  var hamburger     = document.getElementById('hamburger');
  var mobileMenu    = document.getElementById('mobile-menu');
  var navLinks      = document.querySelectorAll('.nav-link');
  var filterBtns    = document.getElementById('filter-buttons');
  var searchInput   = document.getElementById('search-input');
  var searchClear   = document.getElementById('search-clear');
  var productsGrid  = document.getElementById('products-grid');
  var emptyState    = document.getElementById('empty-state');
  var resetFilterBtn = document.getElementById('reset-filter');
  var floatToggle   = document.getElementById('float-toggle');
  var floatPanel    = document.getElementById('float-panel');
  var floatClose    = document.getElementById('float-close');
  var enquiryCount  = document.getElementById('enquiry-count');
  var enquiryItems  = document.getElementById('enquiry-items');
  var enquiryTotal  = document.getElementById('enquiry-total');
  var floatFooter   = document.getElementById('float-footer');
  var floatEmptyMsg = document.getElementById('float-empty-msg');
  var whatsappSend  = document.getElementById('whatsapp-send');
  var clearEnquiry  = document.getElementById('clear-enquiry');
  var contactForm   = document.getElementById('contact-form');

  // ─── 4. NAVBAR MODULE ──────────────────────────────────────────
  var NavbarModule = {
    init: function () {
      var ticking = false;

      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            NavbarModule.onScroll();
            ticking = false;
          });
          ticking = true;
        }
      });

      hamburger.addEventListener('click', function () {
        NavbarModule.toggleMobile();
      });

      // Close mobile menu on link click
      document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
          document.body.classList.remove('nav-open');
          hamburger.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
        });
      });
    },

    onScroll: function () {
      if (window.scrollY > NAV_SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      NavbarModule.updateActiveLink();
    },

    toggleMobile: function () {
      var isOpen = document.body.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    },

    updateActiveLink: function () {
      var sections = ['hero', 'benefits', 'products', 'about', 'safety', 'contact'];
      var scrollY = window.scrollY + 90;

      sections.forEach(function (id) {
        var section = document.getElementById(id);
        if (!section) return;
        var top = section.offsetTop;
        var bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          navLinks.forEach(function (link) { link.classList.remove('active'); });
          var activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }
  };

  // ─── 5. SMOOTH SCROLL MODULE ───────────────────────────────────
  var SmoothScrollModule = {
    init: function () {
      document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
          var href = anchor.getAttribute('href');
          if (!href || href === '#') return;
          var target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          var navHeight = navbar ? navbar.offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
          if (history.pushState) {
            history.pushState(null, '', href);
          }
        });
      });
    }
  };

  // ─── 6. SCROLL REVEAL MODULE ────────────────────────────────────
  var ScrollRevealModule = {
    observer: null,

    init: function () {
      var options = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      };

      ScrollRevealModule.observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(function () {
              el.classList.add('is-visible');
            }, delay);
            ScrollRevealModule.observer.unobserve(el);
          }
        });
      }, options);

      ScrollRevealModule.observeAll();
    },

    observeAll: function () {
      document.querySelectorAll('.reveal').forEach(function (el) {
        ScrollRevealModule.observer.observe(el);
      });
    },

    observe: function (el) {
      if (ScrollRevealModule.observer) {
        el.classList.remove('is-visible');
        ScrollRevealModule.observer.observe(el);
      }
    }
  };

  // ─── 7. ANIMATION MODULE ────────────────────────────────────────
  var AnimationModule = {
    init: function () {
      AnimationModule.initMarquee();
      AnimationModule.initRipple();
      AnimationModule.initCounters();
    },

    initMarquee: function () {
      // Clone text for seamless infinite loop (translateX -50%)
      ['marquee1', 'marquee2'].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        var clone = el.cloneNode(true);
        clone.removeAttribute('id');
        el.parentNode.appendChild(clone);
      });
    },

    initRipple: function () {
      document.addEventListener('mousedown', function (e) {
        var btn = e.target.closest('.btn-primary, .btn-add-enquiry, .btn-outline, .filter-btn');
        if (!btn) return;
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top  = y + 'px';
        btn.appendChild(ripple);
        setTimeout(function () {
          if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 650);
      });
    },

    initCounters: function () {
      var counters = document.querySelectorAll('.stat-number, .about-stat-num');
      if (!counters.length) return;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.dataset.target || '0', 10);
          AnimationModule.countUp(el, target);
          observer.unobserve(el);
        });
      }, { threshold: 0.5 });

      counters.forEach(function (el) { observer.observe(el); });
    },

    countUp: function (el, target) {
      var start = 0;
      var duration = 1800;
      var startTime = null;

      function ease(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var value = Math.floor(ease(progress) * target);
        el.textContent = target >= 1000
          ? (value / 1000).toFixed(value >= 1000 ? 0 : 1).replace('.0', '')
          : value;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target >= 1000 ? Math.floor(target / 1000) : target;
      }

      requestAnimationFrame(step);
    }
  };

  // ─── 8. PRODUCT MODULE ──────────────────────────────────────────
  var ProductModule = {
    renderProducts: function (list) {
      productsGrid.innerHTML = '';
      if (!list || list.length === 0) {
        emptyState.style.display = 'flex';
        return;
      }
      emptyState.style.display = 'none';

      list.forEach(function (p, i) {
        var card = document.createElement('article');
        card.className = 'product-card reveal' + (p.tall ? ' card-tall' : '');
        card.dataset.category = p.category;
        card.dataset.id = p.id;
        card.dataset.delay = String(Math.min(i % 4 * 80, 320));
        card.innerHTML = ProductModule.cardHTML(p);
        productsGrid.appendChild(card);
      });

      // Re-observe new cards
      productsGrid.querySelectorAll('.reveal').forEach(function (el) {
        ScrollRevealModule.observe(el);
      });

      // Bind add-to-enquiry buttons
      productsGrid.querySelectorAll('.btn-add-enquiry').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var card = btn.closest('.product-card');
          var id = parseInt(card.dataset.id, 10);
          EnquiryModule.addItem(id);
          btn.textContent = 'Added ✓';
          btn.classList.add('added');
          setTimeout(function () {
            btn.textContent = 'Add to Cart';
            btn.classList.remove('added');
          }, 2000);
        });
      });
    },

    cardHTML: function (p) {
      var savings = Math.round((1 - p.price / p.mrp) * 100);
      var imageHTML;

      if (p.image) {
        imageHTML = '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">';
      } else {
        imageHTML = '<div class="card-gradient-img"><p class="card-gradient-name">' + p.name + '</p></div>';
      }

      var catLabel = p.category.charAt(0).toUpperCase() + p.category.slice(1);

      return (
        '<div class="card-image-wrap">' +
          imageHTML +
          '<span class="card-tag ' + p.tagClass + '">' + p.label + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<span class="card-category-badge">' + catLabel + '</span>' +
          '<h3 class="card-name">' + p.name + '</h3>' +
          '<div class="card-pricing">' +
            '<span class="price-offer">&#8377;' + p.price + '</span>' +
            '<span class="price-mrp">&#8377;' + p.mrp + '</span>' +
            '<span class="price-save">' + savings + '% off</span>' +
          '</div>' +
          '<button class="btn-add-enquiry" aria-label="Add ' + p.name + ' to cart">Add to Cart</button>' +
        '</div>'
      );
    }
  };

  // ─── 9. FILTER MODULE ───────────────────────────────────────────
  var FilterModule = {
    init: function () {
      if (!filterBtns) return;
      filterBtns.addEventListener('click', function (e) {
        var btn = e.target.closest('.filter-btn');
        if (!btn) return;
        var cat = btn.dataset.cat;
        activeCategory = cat;
        filterBtns.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        FilterModule.apply();
        // Scroll into products section
        var productsSection = document.getElementById('products');
        if (productsSection) {
          var navH = navbar ? navbar.offsetHeight : 0;
          var top = productsSection.getBoundingClientRect().top + window.scrollY - navH;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    },

    apply: function () {
      var term = searchInput ? searchInput.value.trim().toLowerCase() : '';
      var filtered = products.filter(function (p) {
        var matchCat = activeCategory === 'all' || p.category === activeCategory;
        var matchSearch = !term ||
          p.name.toLowerCase().indexOf(term) !== -1 ||
          p.category.toLowerCase().indexOf(term) !== -1 ||
          p.label.toLowerCase().indexOf(term) !== -1;
        return matchCat && matchSearch;
      });
      ProductModule.renderProducts(filtered);
    }
  };

  // ─── 10. SEARCH MODULE ──────────────────────────────────────────
  var SearchModule = {
    init: function () {
      if (!searchInput) return;

      searchInput.addEventListener('input', function () {
        clearTimeout(searchDebounceTimer);
        var hasValue = searchInput.value.trim().length > 0;
        if (searchClear) searchClear.style.display = hasValue ? 'flex' : 'none';
        searchDebounceTimer = setTimeout(function () {
          FilterModule.apply();
        }, SEARCH_DEBOUNCE_MS);
      });

      if (searchClear) {
        searchClear.addEventListener('click', function () {
          searchInput.value = '';
          searchClear.style.display = 'none';
          searchInput.focus();
          FilterModule.apply();
        });
      }

      if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function () {
          activeCategory = 'all';
          if (searchInput) searchInput.value = '';
          if (searchClear) searchClear.style.display = 'none';
          filterBtns.querySelectorAll('.filter-btn').forEach(function (b) {
            b.classList.toggle('active', b.dataset.cat === 'all');
          });
          ProductModule.renderProducts(products);
        });
      }
    }
  };

  // ─── 11. ENQUIRY MODULE ─────────────────────────────────────────
  var EnquiryModule = {
    init: function () {
      EnquiryModule.loadFromStorage();
      EnquiryModule.renderFloat();

      if (floatToggle) {
        floatToggle.addEventListener('click', function () {
          EnquiryModule.togglePanel();
        });
      }

      if (floatClose) {
        floatClose.addEventListener('click', function () {
          EnquiryModule.closePanel();
        });
      }

      if (clearEnquiry) {
        clearEnquiry.addEventListener('click', function () {
          enquiryList = [];
          EnquiryModule.saveToStorage();
          EnquiryModule.renderFloat();
        });
      }

      if (whatsappSend) {
        whatsappSend.addEventListener('click', function (e) {
          e.preventDefault();
          WhatsAppModule.sendEnquiry();
        });
      }

      // +/- qty buttons — registered once here, not inside renderFloat
      if (enquiryItems) {
        enquiryItems.addEventListener('click', function (e) {
          var btn = e.target.closest('.ei-qty-btn');
          if (!btn) return;
          var id = parseInt(btn.dataset.id, 10);
          if (btn.dataset.action === 'dec') EnquiryModule.removeItem(id);
          else EnquiryModule.increaseItem(id);
        });
      }

      // Close panel on outside click
      document.addEventListener('click', function (e) {
        if (!e.target.closest('.enquiry-float')) {
          EnquiryModule.closePanel();
        }
      });
    },

    addItem: function (id) {
      var product = products.find(function (p) { return p.id === id; });
      if (!product) return;
      var existing = enquiryList.find(function (i) { return i.id === id; });
      if (existing) {
        existing.qty++;
      } else {
        enquiryList.push({ id: id, name: product.name, price: product.price, qty: 1 });
      }
      EnquiryModule.saveToStorage();
      EnquiryModule.renderFloat();
      EnquiryModule.animateBadge();
      if (!isPanelOpen) {
        EnquiryModule.openPanel();
        setTimeout(function () { EnquiryModule.closePanel(); }, 2200);
      }
    },

    removeItem: function (id) {
      var idx = enquiryList.findIndex(function (i) { return i.id === id; });
      if (idx === -1) return;
      if (enquiryList[idx].qty > 1) {
        enquiryList[idx].qty--;
      } else {
        enquiryList.splice(idx, 1);
      }
      EnquiryModule.saveToStorage();
      EnquiryModule.renderFloat();
    },

    increaseItem: function (id) {
      var item = enquiryList.find(function (i) { return i.id === id; });
      if (item) { item.qty++; EnquiryModule.saveToStorage(); EnquiryModule.renderFloat(); }
    },

    renderFloat: function () {
      var total = enquiryList.reduce(function (sum, i) { return sum + i.price * i.qty; }, 0);
      var count = enquiryList.reduce(function (sum, i) { return sum + i.qty; }, 0);

      if (enquiryCount) enquiryCount.textContent = count;
      if (enquiryTotal) enquiryTotal.textContent = total.toLocaleString('en-IN');

      var hasItems = enquiryList.length > 0;

      if (floatEmptyMsg) floatEmptyMsg.style.display = hasItems ? 'none' : 'block';
      if (floatFooter) floatFooter.style.display = hasItems ? 'flex' : 'none';

      if (enquiryItems) {
        enquiryItems.innerHTML = '';
        enquiryList.forEach(function (item) {
          var li = document.createElement('li');
          li.className = 'enquiry-item';
          li.innerHTML =
            '<span class="ei-name">' + item.name + '</span>' +
            '<span class="ei-qty">' +
              '<button class="ei-qty-btn" data-action="dec" data-id="' + item.id + '" aria-label="Decrease">&#8722;</button>' +
              '<span class="ei-count">' + item.qty + '</span>' +
              '<button class="ei-qty-btn" data-action="inc" data-id="' + item.id + '" aria-label="Increase">&#43;</button>' +
            '</span>' +
            '<span class="ei-price">&#8377;' + (item.price * item.qty).toLocaleString('en-IN') + '</span>';
          enquiryItems.appendChild(li);
        });
      }

      // Update WhatsApp href
      if (whatsappSend) {
        var msg = WhatsAppModule.buildMessage(enquiryList);
        whatsappSend.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
      }
    },

    togglePanel: function () {
      if (isPanelOpen) EnquiryModule.closePanel();
      else EnquiryModule.openPanel();
    },

    openPanel: function () {
      isPanelOpen = true;
      if (floatPanel) { floatPanel.classList.add('open'); floatPanel.setAttribute('aria-hidden', 'false'); }
      if (floatToggle) floatToggle.setAttribute('aria-expanded', 'true');
    },

    closePanel: function () {
      isPanelOpen = false;
      if (floatPanel) { floatPanel.classList.remove('open'); floatPanel.setAttribute('aria-hidden', 'true'); }
      if (floatToggle) floatToggle.setAttribute('aria-expanded', 'false');
    },

    animateBadge: function () {
      if (!enquiryCount) return;
      enquiryCount.classList.remove('pop');
      void enquiryCount.offsetWidth; // reflow
      enquiryCount.classList.add('pop');
    },

    saveToStorage: function () {
      try { localStorage.setItem('hsc_enquiry', JSON.stringify(enquiryList)); } catch (e) { /* Safari private mode */ }
    },

    loadFromStorage: function () {
      try {
        var saved = localStorage.getItem('hsc_enquiry');
        if (saved) enquiryList = JSON.parse(saved);
      } catch (e) { enquiryList = []; }
    }
  };

  // ─── 12. WHATSAPP MODULE ─────────────────────────────────────────
  var WhatsAppModule = {
    init: function () {
      if (!contactForm) return;
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!WhatsAppModule.validateForm()) return;
        WhatsAppModule.sendFormEnquiry();
      });
    },

    buildMessage: function (list) {
      if (!list || list.length === 0) return 'Hello! I would like to enquire about your crackers.';
      var total = list.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
      var lines = list.map(function (i) {
        return '• ' + i.name + ' x' + i.qty + ' — ₹' + (i.price * i.qty).toLocaleString('en-IN');
      });
      return (
        'Hello! I am interested in the following crackers from Khushi Pataki:\n\n' +
        lines.join('\n') +
        '\n\nEstimated Total: ₹' + total.toLocaleString('en-IN') +
        '\n\nPlease confirm availability and pricing. Thank you!'
      );
    },

    sendEnquiry: function () {
      var msg = WhatsAppModule.buildMessage(enquiryList);
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
    },

    validateForm: function () {
      var valid = true;
      var name = document.getElementById('form-name');
      var phone = document.getElementById('form-phone');
      var errName = document.getElementById('err-name');
      var errPhone = document.getElementById('err-phone');

      if (errName) errName.textContent = '';
      if (errPhone) errPhone.textContent = '';

      if (!name || name.value.trim().length < 2) {
        if (errName) errName.textContent = 'Please enter your name (at least 2 characters).';
        if (name) name.focus();
        valid = false;
      }

      if (valid && (!phone || phone.value.trim().length < 7)) {
        if (errPhone) errPhone.textContent = 'Please enter a valid phone number.';
        if (phone) phone.focus();
        valid = false;
      }

      return valid;
    },

    sendFormEnquiry: function () {
      var name     = document.getElementById('form-name').value.trim();
      var phone    = document.getElementById('form-phone').value.trim();
      var category = document.getElementById('form-category').value;
      var message  = document.getElementById('form-message').value.trim();

      var text =
        'Hello! My name is ' + name + '.\n' +
        'Phone: ' + phone + '\n' +
        (category ? 'Interested in: ' + category + '\n' : '') +
        (message  ? '\nMessage: ' + message + '\n' : '') +
        '\nContacted via Khushi Pataki website.';

      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
    }
  };

  // ─── 13. INIT ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    NavbarModule.init();
    SmoothScrollModule.init();
    ScrollRevealModule.init();
    AnimationModule.init();
    ProductModule.renderProducts(products);
    FilterModule.init();
    SearchModule.init();
    EnquiryModule.init();
    WhatsAppModule.init();
  });

})();
