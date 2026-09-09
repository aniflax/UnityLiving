/**
 * Unitya Living - Homepage sections from Strapi
 * Fetches Hero Section, Our Approach, Facts and Testimonials and fills the homepage sections.
 * No frontend fallback: if the CMS is down or fields are empty these elements stay hidden.
 */
(function () {
  var STRAPI_URL = "https://admin.unityaliving.com";

  function get(url) {
    return fetch(STRAPI_URL + url, { headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error("status " + r.status); return r.json(); })
      .catch(function (e) { console.warn("[home-sections] fetch error", url, e); return null; });
  }

  function mediaUrl(m) {
    if (!m) return null;
    var u = m.url ||
      (m.formats && m.formats.small && m.formats.small.url) ||
      (m.formats && m.formats.thumbnail && m.formats.thumbnail.url) ||
      null;
    if (!u) return null;
    if (u.indexOf("http") === 0) return u;
    if (u.charAt(0) === "/") return STRAPI_URL + u;
    return u;
  }

  function attrs(data) {
    return (data && (data.attributes || data)) || null;
  }

  function renderHero(data) {
    var h = attrs(data);
    var heroBtns = document.querySelectorAll('#welcome a.site-button.outline.white, #mobile-hero .mh-btn');
    if (!heroBtns.length) return;
    // No fallback: if CMS missing or buttonLabel empty, hide buttons entirely
    if (!h || !h.buttonLabel || !String(h.buttonLabel).trim()) {
      heroBtns.forEach(function (a) { a.setAttribute('hidden', ''); a.style.display = 'none'; });
      return;
    }
    var label = String(h.buttonLabel).trim();
    var url = h.buttonUrl ? String(h.buttonUrl).trim() : '';
    heroBtns.forEach(function (a) {
      a.textContent = label;
      if (url) a.setAttribute('href', url);
      a.removeAttribute('hidden');
      a.style.display = '';
    });
  }

  function renderApproach(data) {
    var a = attrs(data);
    if (!a) return;
    var titleEl = document.getElementById("approach-title");
    if (titleEl && a.title) {
      var words = String(a.title).trim().split(/\s+/);
      var html = "";
      words.forEach(function (w, i) {
        html += '<span style="font-weight:800;">' + w + '</span>';
        html += (i === 2) ? '<br>' : ' ';
      });
      titleEl.innerHTML = html;
    }
    var subEl = document.getElementById("approach-subtitle");
    if (subEl && a.subtitle) subEl.textContent = a.subtitle;
    var yearsEl = document.getElementById("approach-years");
    if (yearsEl) {
      yearsEl.textContent = (String(a.years || "") + (a.yearsLabel ? " " + a.yearsLabel : "")).trim();
    }
    var capEl = document.getElementById("approach-years-caption");
    if (capEl && a.yearsCaption) capEl.textContent = a.yearsCaption;

    // Approach buttons — no frontend fallback, hidden unless CMS provides label
    var btn1 = document.getElementById("approach-btn-1");
    if (btn1) {
      var label1 = a.button1Label ? String(a.button1Label).trim() : "";
      if (label1) {
        var span1 = btn1.querySelector("span");
        if (span1) span1.textContent = label1; else btn1.textContent = label1;
        if (a.button1Url && String(a.button1Url).trim()) btn1.setAttribute("href", String(a.button1Url).trim());
        else btn1.removeAttribute("href");
        btn1.removeAttribute("hidden");
        btn1.style.display = "";
      } else {
        btn1.setAttribute("hidden", "");
        btn1.style.display = "none";
      }
    }
    var btn2 = document.getElementById("approach-btn-2");
    if (btn2) {
      var label2 = a.button2Label ? String(a.button2Label).trim() : "";
      if (label2) {
        var span2 = btn2.querySelector("span");
        if (span2) span2.textContent = label2; else btn2.textContent = label2;
        if (a.button2Url && String(a.button2Url).trim()) btn2.setAttribute("href", String(a.button2Url).trim());
        else btn2.removeAttribute("href");
        btn2.removeAttribute("hidden");
        btn2.style.display = "";
      } else {
        btn2.setAttribute("hidden", "");
        btn2.style.display = "none";
      }
    }
  }

  function renderFacts(data) {
    var a = attrs(data);
    if (!a) return;
    var title = String(a.title || "").trim();
    if (title) {
      var sp = title.indexOf(" ");
      var light = sp === -1 ? title : title.slice(0, sp);
      var rest = sp === -1 ? "" : title.slice(sp + 1);
      var lEl = document.getElementById("facts-title-light");
      if (lEl) lEl.textContent = light;
      var bEl = document.getElementById("facts-title-bold");
      if (bEl) bEl.textContent = rest;
    }
    var subEl = document.getElementById("facts-subtext");
    if (subEl && a.subtext) subEl.textContent = a.subtext;

    var wrap = document.getElementById("facts-specs");
    if (wrap && Array.isArray(a.specs) && a.specs.length) {
      wrap.innerHTML = "";
      a.specs.forEach(function (spec) {
        var s = spec || {};
        var col = document.createElement("div");
        col.className = "col-md-4 col-sm-4";
        col.innerHTML =
          '<div class="wt-icon-box-wraper p-a10 text-white m-b30">' +
          '<div class="icon-content text-center">' +
          '<div class="font-40 font-weight-600 m-b5 text-white"><span class="fact-value">' + (s.value || "") + '</span></div>' +
          '<div class="wt-separator-outer m-b20"><div class="wt-separator bg-white"></div></div>' +
          '<span class="text-uppercase">' + (s.label || "") + '</span>' +
          '</div></div>';
        wrap.appendChild(col);
      });
    }
  }

  function renderTestimonials(data) {
    var list = (data && data.data) || [];
    var carousel = document.getElementById("testimonial-carousel");
    if (!carousel || !list.length) return;
    carousel.innerHTML = "";
    list.forEach(function (item) {
      var t = attrs(item);
      if (!t) return;
      var img = mediaUrl(t.image);
      var el = document.createElement("div");
      el.className = "item";
      el.innerHTML =
        '<div class="testimonial-6">' +
        '<div class="testimonial-pic-block"><div class="testimonial-pic">' +
        (img ? '<img src="' + img + '" width="132" height="132" alt="' + (t.name || "") + '">' : '') +
        '</div></div>' +
        '<div class="testimonial-text clearfix bg-white">' +
        '<div class="testimonial-detail clearfix">' +
        '<strong class="testimonial-name">' + (t.name || "") + '</strong>' +
        '<span class="testimonial-position p-t0">' + (t.role || "") + '</span>' +
        '</div>' +
        '<div class="testimonial-paragraph text-black p-t15">' +
        '<span class="fa fa-quote-left"></span>' +
        '<p>' + (t.feedback || "") + '</p>' +
        '</div></div></div>';
      carousel.appendChild(el);
    });
    // (re)initialise the owl carousel now that items exist
    if (window.jQuery && jQuery.fn && jQuery.fn.owlCarousel) {
      var $c = jQuery(carousel);
      if ($c.hasClass("owl-loaded")) $c.trigger("destroy.owl.carousel");
      $c.owlCarousel({
        loop: true,
        autoplay: false,
        margin: 80,
        nav: false,
        dots: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: { 0: { items: 1 }, 991: { items: 2 } },
      });
    }
  }

  // Immediately hide hero buttons to remove frontend fallback flash — they only reappear if Strapi returns a label
  (function hideHeroFallback() {
    try {
      var hb = document.querySelectorAll('#welcome a.site-button.outline.white, #mobile-hero .mh-btn');
      hb.forEach(function (a) { a.style.display = 'none'; a.setAttribute('hidden', ''); });
    } catch (e) {}
  })();

  function renderHeroStats(data) {
    var d = data || {};
    var section = document.getElementById("hero-stats");
    var list = document.getElementById("hero-stats-list");
    if (!section || !list) return;
    var a = attrs(d);
    if (!a || !Array.isArray(a.stats) || a.stats.length === 0) {
      // No fallback — keep the section hidden entirely if CMS returns nothing
      section.setAttribute("hidden", "");
      list.innerHTML = "";
      return;
    }
    var html = "";
    a.stats.forEach(function (s) {
      if (!s) return;
      var label = String(s.label || "").trim();
      var value = parseInt(s.value, 10);
      if (!label || isNaN(value)) return;
      var symbol = s.symbol ? String(s.symbol) : "";
      // escape symbol text for inline HTML
      var symHtml = "";
      if (symbol) symHtml = '<span class="sym">' + symbol.replace(/[<&>]/g, "") + "</span>";
      html +=
        '<div class="hero-stat">' +
        '<div class="hero-stat-value"><span class="num" data-count-to="' + value + '">0</span>' + symHtml + '</div>' +
        '<div class="hero-stat-label">' + label.replace(/[<&>]/g, function (c) {
          return { "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c];
        }) + "</div>" +
        "</div>";
    });
    if (!html) {
      section.setAttribute("hidden", "");
      list.innerHTML = "";
      return;
    }
    list.innerHTML = html;
    section.removeAttribute("hidden");
    // Arm the count-up animation for the freshly-rendered cells
    if (window.__unityaArmStats) {
      try { window.__unityaArmStats(); } catch (e) {}
    }
  }

  function run() {
    var isHome =
      document.getElementById("approach-title") ||
      document.getElementById("facts-specs") ||
      document.getElementById("testimonial-carousel") ||
      document.getElementById("hero-stats");
    if (!isHome) return;
    get("/api/hero-section?populate=*").then(function (d) { renderHero(d && d.data); });
    get("/api/hero-stat?populate=*").then(function (d) { renderHeroStats(d && d.data); });
    get("/api/approach?populate=*").then(function (d) { renderApproach(d && d.data); });
    get("/api/fact?populate=*").then(function (d) { renderFacts(d && d.data); });
    get("/api/testimonials?populate=*").then(renderTestimonials);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
