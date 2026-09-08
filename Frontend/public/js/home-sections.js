/**
 * Unitya Living - Homepage sections from Strapi
 * Fetches Our Approach, Facts and Testimonials and fills the homepage sections.
 * No frontend fallback: if the CMS is down these sections stay empty.
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

  function run() {
    var isHome =
      document.getElementById("approach-title") ||
      document.getElementById("facts-specs") ||
      document.getElementById("testimonial-carousel");
    if (!isHome) return;
    get("/api/approach?populate=*").then(function (d) { renderApproach(d && d.data); });
    get("/api/fact?populate=*").then(function (d) { renderFacts(d && d.data); });
    get("/api/testimonials?populate=*").then(renderTestimonials);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();