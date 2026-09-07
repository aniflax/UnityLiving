/**
 * Unitya Living - Site-wide contact / social / director wiring from Strapi
 * Fetches the "Personal Informations" single type and populates:
 *  - Footer: email, phone, whatsapp, social links (instagram/facebook/youtube/linkedin/twitter)
 *  - Hero social icons
 *  - Founder page: directorImage (founder photo)
 * Strapi-only (no frontend fallback): if the CMS is down, these fields stay empty.
 */
(function () {
  var STRAPI_URL = "https://admin.unityaliving.com";

  function fetchInfo() {
    return fetch(STRAPI_URL + "/api/personal-information?populate=*", {
      headers: { Accept: "application/json" },
    })
      .then(function (r) { if (!r.ok) throw new Error("status " + r.status); return r.json(); })
      .then(function (j) { return j.data || null; })
      .catch(function (e) { console.warn("[site] fetch error", e); return null; });
  }

  function mediaUrl(img) {
    if (!img) return null;
    var u = img.url || (img.formats && img.formats.large && img.formats.large.url) ||
      (img.formats && img.formats.medium && img.formats.medium.url) || null;
    if (!u) return null;
    if (u.indexOf("http") === 0) return u;
    if (u.charAt(0) === "/") return STRAPI_URL + u;
    return u;
  }

  function apply(data) {
    if (!data) return;
    var attrs = data.attributes || data;

    // Email
    if (attrs.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
        a.href = "mailto:" + attrs.email;
        a.textContent = attrs.email;
      });
    }
    // Phone
    if (attrs.phone) {
      var tel = String(attrs.phone).replace(/[^+\d]/g, "");
      document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
        a.href = "tel:" + tel;
        a.textContent = attrs.phone;
      });
    }
    // WhatsApp — update bare wa.me links (footer); keep enquiry link's pre-filled message
    if (attrs.whatsapp) {
      var wa = String(attrs.whatsapp).replace(/[^\d]/g, "");
      document.querySelectorAll('a[href^="https://wa.me"], a[href^="http://wa.me"]').forEach(function (a) {
        if (a.getAttribute("href").indexOf("?") === -1) {
          a.href = "https://wa.me/" + wa;
        }
      });
    }
    // Social links (match by aria-label, case-insensitive on common labels)
    var socialMap = {
      instagram: attrs.instagram,
      facebook: attrs.facebook,
      youtube: attrs.youtube,
      linkedin: attrs.linkedin,
      twitter: attrs.twitter,
    };
    document.querySelectorAll("[aria-label]").forEach(function (el) {
      var label = (el.getAttribute("aria-label") || "").toLowerCase();
      for (var key in socialMap) {
        if (label.indexOf(key) !== -1 && socialMap[key]) {
          el.setAttribute("href", socialMap[key]);
          break;
        }
      }
    });
    // Founder / director image (founder page)
    var di = mediaUrl(attrs.directorImage);
    if (di) {
      document.querySelectorAll('img[alt*="Founder"], img[alt*="founder"], img[alt*="Director"], img[alt*="director"]').forEach(function (img) {
        img.src = di;
      });
    }
  }

  function run() {
    fetchInfo().then(apply);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
