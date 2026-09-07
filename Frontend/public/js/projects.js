/**
 * Unitya Living - Projects integration with Strapi
 * Fetches from https://admin.unityaliving.com/api/projects?populate=*
 * - Homepage: shows projects where showOnHomepage=true, first spec's value as location
 * - Listing (/projects): shows all projects with category filter
 * - Detail (/projects/:type or ?project=): shows single project by type slug
 */
(function () {
  var STRAPI_URL = "https://admin.unityaliving.com";
  var API_BASE = STRAPI_URL + "/api/projects";

  function getMediaUrl(media) {
    if (!media) return null;
    var url = media.url;
    if (!url) return null;
    if (url.indexOf("http") === 0) return url;
    if (url.charAt(0) === "/") return STRAPI_URL + url;
    return url;
  }

  function normalizeProject(p) {
    var a = p.attributes || p;
    var hero = a.heroImage;
    if (hero && hero.data) hero = hero.data.attributes || hero.data;
    var gallery = a.Gallery;
    if (gallery && gallery.data) gallery = gallery.data.map(function (d) { return d.attributes || d; });
    else if (Array.isArray(gallery) && gallery.length && gallery[0].data) gallery = gallery.map(function (d) { return (d.data && d.data.attributes) || d; });
    // handle case where gallery is already array of media objects
    if (!Array.isArray(gallery)) gallery = gallery ? [gallery] : [];

    var cat = a.category;
    if (cat && cat.data) cat = cat.data.attributes || cat.data;

    return {
      id: p.documentId || p.id,
      documentId: p.documentId || p.id,
      type: a.type,
      Headline: a.Headline,
      smallText: a.smallText,
      title: a.title,
      description: a.description,
      specs: a.specs || [],
      heroImage: hero,
      Gallery: gallery,
      category: cat,
      showOnHomepage: !!a.showOnHomepage,
      _raw: a
    };
  }

  function fetchProjects(params) {
    var url = API_BASE + "?populate=*";
    if (params) {
      var qs = Object.keys(params).map(function (k) { return k + "=" + encodeURIComponent(params[k]); }).join("&");
      if (qs) url += "&" + qs;
    }
    return fetch(url, { headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error("fetch " + r.status); return r.json(); })
      .then(function (j) { return (j.data || []).map(normalizeProject); })
      .catch(function (e) { console.warn("[projects] fetch error", e); return []; });
  }

  function getFirstSpecValue(specs) {
    if (!specs || !specs.length) return "";
    var first = specs[0];
    return first.value || first.Value || "";
  }

  function renderHomepage(projects) {
    var grid = document.querySelector(".lp-grid");
    if (!grid) return;
    var home = projects.filter(function (p) { return p.showOnHomepage; });
    if (home.length === 0) home = projects.slice(0, 4);
    home = home.slice(0, 4);
    if (home.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#777; font-family:Inter,sans-serif; padding:40px;">No featured projects yet.</p>';
      return;
    }
    grid.innerHTML = "";
    home.forEach(function (proj) {
      var imgUrl = getMediaUrl(proj.heroImage) || "images/latest-project/architecture.jpg";
      var title = proj.Headline || "Untitled";
      var loc = getFirstSpecValue(proj.specs) || proj.smallText || "";
      // Extract year from specs if available, else empty
      var year = "";
      if (proj.specs) {
        var yearSpec = proj.specs.find(function (s) { return (s.label || "").toLowerCase().indexOf("year") !== -1; });
        if (yearSpec) year = yearSpec.value;
      }
      var meta = loc ? loc + (year ? " · " + year : "") : (proj.smallText || "");
      var href = "projects/" + (proj.type || "").toLowerCase() + "/";
      // Fallback to project-detail with query if needed
      if (!proj.type) href = "projects/project-detail.html?project=" + (proj.documentId || "");

      var card = document.createElement("a");
      card.className = "lp-card";
      card.href = href;
      card.setAttribute("aria-label", "View " + title + " project");
      card.innerHTML =
        '<div class="lp-card-media"><img src="' + imgUrl + '" alt="' + title.replace(/"/g, "&quot;") + '" loading="lazy"></div>' +
        '<div class="lp-card-body"><h3>' + title + '</h3><div class="lp-card-foot"><span class="meta">' + meta + '</span><span class="lp-card-view">View</span></div></div>';
      grid.appendChild(card);
    });
  }

  function renderListing(projects, categoryList) {
    var grid = document.getElementById("project-grid");
    var filterContainer = document.querySelector(".project-filter-scroll");
    if (!grid) return;

    // Build dynamic filter buttons from Strapi categories (so new categories appear automatically)
    function buildFilters(categoryList) {
      if (!filterContainer) return;
      var cats = [];
      (categoryList || []).forEach(function (c) {
        var name = (c.attributes && c.attributes.name) || c.name;
        if (name) cats.push(name);
      });
      // Ensure categories that have projects but no category entry are included
      projects.forEach(function (p) {
        var cn = p.categoryName || (p.category && p.category.name);
        if (cn && cats.indexOf(cn) === -1) cats.push(cn);
      });
      var html = '<button type="button" class="project-filter is-active" data-filter="all">All</button>';
      cats.forEach(function (name) {
        var key = name.toLowerCase().replace(/\s+/g, "-");
        html += '<button type="button" class="project-filter" data-filter="' + key + '">' + name + '</button>';
      });
      filterContainer.innerHTML = html;
    }

    function renderGrid(filter) {
      grid.innerHTML = "";
      var filtered = projects;
      if (filter && filter !== "all") {
        filtered = projects.filter(function (p) {
          var catName = (p.categoryName || (p.category && p.category.name) || "").toLowerCase().replace(/\s+/g, "-");
          var catRaw = (p.categoryName || (p.category && p.category.name) || "").toLowerCase();
          var typeLow = (p.type || "").toLowerCase();
          return catName === filter || catRaw === filter || typeLow === filter;
        });
      }
      if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#777; font-family:Inter,sans-serif; padding:40px;">No projects found.</p>';
        return;
      }
      filtered.forEach(function (proj) {
        var imgUrl = getMediaUrl(proj.heroImage) || "../images/gallery/portrait/pic1.jpg";
        var catDisplay = proj.categoryName || (proj.category && proj.category.name) || proj.type || "Architecture";
        var title = proj.Headline || "Untitled";
        var intro = proj.title || "";
        if (intro.length > 120) intro = intro.substring(0, 120) + "...";
        var href = "project-detail.html?project=" + (proj.type || proj.documentId || "");
        if (proj.type) href = proj.type.toLowerCase() + "/";

        var article = document.createElement("article");
        article.className = "project-card";
        article.setAttribute("data-category", (proj.categoryName || (proj.category && proj.category.name) || proj.type || "architecture").toLowerCase().replace(/\s+/g, "-"));
        article.innerHTML =
          '<a href="' + href + '" style="display:block; overflow:hidden; background:#f5f5f5;"><img src="' + imgUrl + '" alt="' + title.replace(/"/g, "&quot;") + '" style="width:100%; aspect-ratio:4/5; object-fit:cover;" class="img-zoom" loading="lazy"></a>' +
          '<div style="padding:22px 24px 24px;">' +
          '<p class="eyebrow">' + catDisplay + '</p>' +
          '<h3 class="display" style="margin-top:12px; font-size:17px; line-height:1.3;"><a href="' + href + '" style="color:inherit; text-decoration:none;">' + title + '</a></h3>' +
          '<p style="margin-top:12px; font-size:14px; line-height:1.65; color:#777; font-family:Inter,sans-serif;">' + intro + '</p>' +
          '<p style="margin-top:18px; font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:rgba(119,119,119,0.7); font-family:Inter,sans-serif;">View project →</p>' +
          '</div>';
        grid.appendChild(article);
      });
    }

    // Attach filter handlers (delegate to live buttons)
    if (filterContainer) {
      filterContainer.addEventListener("click", function (e) {
        var btn = e.target.closest(".project-filter");
        if (!btn) return;
        var f = btn.getAttribute("data-filter");
        filterContainer.querySelectorAll(".project-filter").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-filter") === f); });
        renderGrid(f);
        var url = new URL(window.location.href);
        if (f === "all") url.searchParams.delete("filter");
        else url.searchParams.set("filter", f);
        history.replaceState(null, "", url.toString());
      });
    }

    // Initial render with filter from URL
    buildFilters(categoryList);
    var initFilter = new URLSearchParams(window.location.search).get("filter") || "all";
    var activeBtn = document.querySelector('.project-filter[data-filter="' + initFilter + '"]');
    if (activeBtn) {
      document.querySelectorAll(".project-filter").forEach(function (b) { b.classList.remove("is-active"); });
      activeBtn.classList.add("is-active");
    }
    renderGrid(initFilter);
  }

  function renderDetail(projects) {
    // Determine slug from URL: /projects/:type/ or ?project=...
    var slug = null;
    var pathMatch = window.location.pathname.match(/\/projects\/([^\/\?#]+)/);
    if (pathMatch) slug = pathMatch[1];
    if (!slug) {
      var params = new URLSearchParams(window.location.search);
      slug = params.get("project");
    }
    if (!slug) slug = "hillcrest-residence";
    slug = decodeURIComponent(slug).toLowerCase();

    var proj = projects.find(function (p) { return (p.type || "").toLowerCase() === slug; });
    if (!proj) {
      // Fallback to first
      proj = projects[0];
      if (!proj) return;
    }

    document.title = (proj.Headline || proj.title || "Project") + " — Unitya Living";
    var heroImg = document.getElementById("project-hero");
    if (heroImg) {
      var heroUrl = getMediaUrl(proj.heroImage);
      if (heroUrl) { heroImg.src = heroUrl; heroImg.alt = proj.Headline || heroImg.alt; }
    }
    var catEl = document.getElementById("project-category");
    if (catEl) {
      var catName = (proj.category && proj.category.name) || proj.type || "Architecture";
      catEl.textContent = catName;
    }
    var titleEl = document.getElementById("project-title");
    if (titleEl) titleEl.textContent = proj.Headline || "";
    var locEl = document.getElementById("project-location");
    if (locEl) locEl.textContent = proj.smallText || getFirstSpecValue(proj.specs) || "";

    var introEl = document.getElementById("project-intro");
    if (introEl) introEl.textContent = proj.title || "";

    var overviewEl = document.getElementById("project-overview");
    if (overviewEl && proj.description) {
      overviewEl.innerHTML = "";
      var desc = proj.description;
      var html = "";
      if (typeof desc === "string") {
        // Handle richtext as string with sections
        var parts = desc.split(/\n\s*\n/);
        parts.forEach(function (part) {
          part = part.trim();
          if (!part) return;
          // Detect headings like DESIGN INTENT, MATERIAL AND CRAFT (all caps)
          if (part === part.toUpperCase() && part.length < 50) {
            html += '<h2 class="display" style="margin-top:28px; font-size: clamp(1.2rem,2.2vw,1.5rem);">' + part + '</h2>';
          } else {
            html += '<p style="font-size:16px; line-height:1.85; color:#777; font-family:Inter,sans-serif;">' + part.replace(/\n/g, "<br>") + '</p>';
          }
        });
        // If description contains HTML already, use as is
        if (desc.indexOf("<") !== -1) html = desc;
      } else if (Array.isArray(desc)) {
        html = desc.map(function (block) {
          if (block.type === "paragraph") {
            var t = (block.children || []).map(function (c) { return c.text || ""; }).join("");
            return '<p style="font-size:16px; line-height:1.85; color:#777; font-family:Inter,sans-serif;">' + t + '</p>';
          } else if (block.type === "heading") {
            var t2 = (block.children || []).map(function (c) { return c.text || ""; }).join("");
            return '<h2 class="display" style="margin-top:24px; font-size: clamp(1.2rem,2.2vw,1.5rem);">' + t2 + '</h2>';
          }
          return "";
        }).join("");
      }
      overviewEl.innerHTML = html;
    }

    // Intent, material, closing - try to split description if those headings exist
    // For now, keep them empty or split from description if needed
    // The description already contains those sections, so we can leave intent/material empty
    var intentEl = document.getElementById("project-intent");
    var materialEl = document.getElementById("project-material");
    var closingEl = document.getElementById("project-closing");
    if (intentEl) intentEl.textContent = "";
    if (materialEl) materialEl.textContent = "";
    if (closingEl) closingEl.textContent = "";

    // Stats
    var statsEl = document.getElementById("project-stats");
    if (statsEl && proj.specs) {
      statsEl.innerHTML = "";
      proj.specs.forEach(function (s) {
        var row = document.createElement("div");
        row.className = "stat-row";
        row.innerHTML = '<span class="label">' + (s.label || "") + '</span><span class="value">' + (s.value || "") + '</span>';
        statsEl.appendChild(row);
      });
    }

    // Gallery
    var galleryEl = document.getElementById("project-gallery");
    if (galleryEl && proj.Gallery) {
      galleryEl.innerHTML = "";
      var gallery = Array.isArray(proj.Gallery) ? proj.Gallery : [proj.Gallery];
      gallery.slice(0, 4).forEach(function (media) {
        var url = getMediaUrl(media);
        if (!url) return;
        var fig = document.createElement("figure");
        fig.className = "gallery-item";
        fig.innerHTML = '<img src="' + url + '" alt="' + (proj.Headline || "") + '" loading="lazy">';
        galleryEl.appendChild(fig);
      });
    }

    // Related
    var relatedEl = document.getElementById("project-related");
    if (relatedEl) {
      relatedEl.innerHTML = "";
      var others = projects.filter(function (p) { return p !== proj; }).slice(0, 3);
      others.forEach(function (other) {
        var thumb = getMediaUrl(other.heroImage) || "../images/gallery/portrait/pic1.jpg";
        var cat = (other.category && other.category.name) || other.type || "Architecture";
        var href = other.type ? other.type.toLowerCase() + "/" : "project-detail.html?project=" + other.documentId;
        var card = document.createElement("article");
        card.className = "related-card";
        card.innerHTML = '<a href="' + href + '" style="display:block; overflow:hidden; background:#f5f5f5;"><img src="' + thumb + '" alt="' + (other.Headline || "") + '" style="width:100%; aspect-ratio:4/3; object-fit:cover;" class="img-zoom" loading="lazy"></a>' +
          '<div style="padding:20px 24px 24px;"><p style="font-size:0.6875rem; letter-spacing:0.18em; text-transform:uppercase; color:#777; font-family:Inter,sans-serif;">' + cat + '</p>' +
          '<h3 class="display" style="margin-top:12px; font-size:16px; line-height:1.3;"><a href="' + href + '" style="color:inherit; text-decoration:none;">' + (other.Headline || "") + '</a></h3></div>';
        relatedEl.appendChild(card);
      });
    }

    // WhatsApp
    var wa = document.getElementById("project-whatsapp");
    if (wa) {
      var msg = "Hi Unitya Living, I'd like to inquire about the " + (proj.Headline || proj.title || "project") + " (" + ((proj.category && proj.category.name) || proj.type || "") + "). Please share the details and get back to me.";
      wa.href = "https://wa.me/916232691255?text=" + encodeURIComponent(msg);
    }
  }

  function fetchCategories() {
    return fetch(STRAPI_URL + "/api/categories?pagination[pageSize]=100", { headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error("fetch " + r.status); return r.json(); })
      .then(function (j) { return j.data || []; })
      .catch(function (e) { console.warn("[projects] categories error", e); return []; });
  }

  function init() {
    var isHomepage = !!document.querySelector(".lp-grid");
    var isListing = !!document.getElementById("project-grid");
    var isDetail = !!document.getElementById("project-hero");

    if (isHomepage) {
      fetchProjects({}).then(function (projects) {
        if (projects && projects.length > 0) renderHomepage(projects);
      });
    }
    if (isListing) {
      Promise.all([fetchProjects({}), fetchCategories()]).then(function (res) {
        if (res[0].length) renderListing(res[0], res[1]);
      });
    }
    if (isDetail) {
      fetchProjects({}).then(function (p) { if (p.length) renderDetail(p); });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
