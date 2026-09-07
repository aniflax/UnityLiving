/**
 * Unitya Living - Blogs integration with Strapi
 * Fetches from https://admin.unityaliving.com/api/blogs?populate=*
 * Handles homepage (Latest Blog) and media pages with imp logic.
 * - Homepage: shows up to 3 blogs where showOnhomePage=true, with imp=true as big right card
 * - Media index: featured = imp true, grid = rest
 * - Detail pages (/media/design, /media/market, /media/project): fetch by Type
 * Silently falls back to static HTML if fetch fails or no data (keeps empty site fallback)
 */
(function () {
  var STRAPI_URL = "https://admin.unityaliving.com";
  var API_BASE = STRAPI_URL + "/api/blogs";

  function getImageUrl(img) {
    if (!img) return null;
    var url = img.url || (img.attributes && img.attributes.url);
    if (!url) return null;
    if (url.indexOf("http") === 0) return url;
    // Strapi media may be on CDN or on admin domain
    if (url.charAt(0) === "/") return STRAPI_URL + url;
    return url;
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
      var d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      // Format as "28 July 2026"
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) {
      return dateStr;
    }
  }

  function stripHtml(html) {
    if (!html) return "";
    var tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  function getExcerpt(blog) {
    // Use shortTag or Blog richtext excerpt
    if (blog.shortTag) return blog.shortTag;
    if (blog.Blog) {
      // Blog is richtext - may be blocks array or string
      var text = "";
      if (typeof blog.Blog === "string") {
        text = stripHtml(blog.Blog);
      } else if (Array.isArray(blog.Blog)) {
        // Strapi 5 blocks: array of {type, children: [{text}]}
        try {
          text = blog.Blog.map(function (block) {
            if (block.children) {
              return block.children.map(function (c) { return c.text || ""; }).join("");
            }
            return "";
          }).join(" ");
        } catch (e) {
          text = "";
        }
      }
      if (text) {
        text = text.trim().replace(/\s+/g, " ");
        if (text.length > 120) text = text.substring(0, 120) + "...";
        return text;
      }
    }
    if (blog.Ending) return blog.Ending.substring(0, 120);
    return "";
  }

  function fetchBlogs(params) {
    var url = API_BASE + "?populate=*";
    if (params) {
      var qs = Object.keys(params).map(function (k) { return k + "=" + encodeURIComponent(params[k]); }).join("&");
      if (qs) url += "&" + qs;
    }
    return fetch(url, { headers: { "Accept": "application/json" } })
      .then(function (res) { if (!res.ok) throw new Error("fetch failed " + res.status); return res.json(); })
      .then(function (json) { return json.data || []; })
      .catch(function (e) { console.warn("[blogs] fetch error", e); return null; });
  }

  // Normalize Strapi data: Strapi 5 returns {id, documentId, Title, ... , image: {url}}
  // Strapi 4 returns {id, attributes: {Title, ...}}
  function normalize(blog) {
    if (!blog) return null;
    var attrs = blog.attributes || blog;
    // Handle image
    var img = attrs.image;
    // In some cases image is populated as {data: {attributes: {url}}}
    if (img && img.data) {
      img = img.data.attributes || img.data;
      if (Array.isArray(img)) img = img[0];
    }
    return {
      id: blog.documentId || blog.id,
      documentId: blog.documentId || blog.id,
      Title: attrs.Title || attrs.title,
      Type: attrs.Type || attrs.type,
      ReadingTime: attrs.ReadingTime || attrs.readingTime || "",
      shortTag: attrs.shortTag || "",
      date: attrs.date,
      Blog: attrs.Blog || attrs.blog,
      Ending: attrs.Ending || attrs.ending || "",
      image: img,
      imp: !!attrs.imp,
      showOnhomePage: !!attrs.showOnhomePage,
      // raw
      _raw: attrs
    };
  }

  function renderHomepage(blogs) {
    var section = document.getElementById("media");
    if (!section) return;
    // Find the row container
    var row = section.querySelector(".row");
    if (!row) return;
    var normalized = blogs.map(normalize).filter(Boolean);
    if (normalized.length === 0) return;

    // Only blogs flagged for homepage; otherwise show nothing (Strapi-only, no fallback)
    var homeBlogs = normalized.filter(function (b) { return b.showOnhomePage; });
    homeBlogs.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    // Limit to 3
    homeBlogs = homeBlogs.slice(0, 3);
    if (homeBlogs.length === 0) return;

    // The imp blog is big; others are small. If no imp flag, all are small.
    var big = homeBlogs.find(function (b) { return b.imp; });
    var small = big ? homeBlogs.filter(function (b) { return b !== big; }) : homeBlogs;

    // Build columns
    var leftCol = row.querySelector(".col-lg-6.col-md-12");
    var rightCol = row.querySelectorAll(".col-lg-6.col-md-12")[1];
    if (!leftCol || !rightCol) {
      var cols = row.querySelectorAll(".col-lg-6");
      if (cols.length >= 2) { leftCol = cols[0]; rightCol = cols[1]; }
    }
    if (!leftCol || !rightCol) return;

    leftCol.innerHTML = "";
    rightCol.innerHTML = "";
    leftCol.style.display = "";
    rightCol.style.display = "";
    rightCol.className = "col-lg-6 col-md-12";

    // Render small cards in leftCol
    small.forEach(function (blog) {
      var imgUrl = getImageUrl(blog.image) || "images/blog/landscap-half/pic1.jpg";
      var title = blog.Title || "Untitled";
      var dateStr = formatDate(blog.date);
      var href = getBlogHref(blog);
      var el = document.createElement("a");
      el.href = href;
      el.style.display = "block";
      el.style.textDecoration = "none";
      el.innerHTML =
        '<div class="overlay-wraper bg-no-repeat bg-cover latest-blog-dark-outer p-a20 m-b30" style="background-image:url(' + imgUrl + ');">' +
        '  <div class="overlay-main bg-black opacity-04"></div>' +
        '  <div class="latest-blog-dark text-uppercase p-a20">' +
        '    <h3 class="m-a0"><span class="text-white">' + escapeHtml(title) + '</span></h3>' +
        '    <div class="v-date text-white font-weight-700">' + escapeHtml(dateStr) + '</div>' +
        '  </div>' +
        '</div>';
      leftCol.appendChild(el);
    });

    // If no imp blog: no big right card, all small (right col hidden, left spans full)
    if (!big) {
      leftCol.className = "col-lg-12 col-md-12";
      rightCol.style.display = "none";
      return;
    }

    // Render big card in rightCol (only when imp is true)
    var bigImg = getImageUrl(big.image) || "images/blog/square/pic1.jpg";
    var bigTitle = big.Title || "Untitled";
    var bigDate = formatDate(big.date);
    var bigExcerpt = getExcerpt(big);
    var bigHref = getBlogHref(big);
    var bigEl = document.createElement("a");
    bigEl.href = bigHref;
    bigEl.style.display = "block";
    bigEl.style.textDecoration = "none";
    bigEl.innerHTML =
      '<div class="overlay-wraper bg-no-repeat bg-cover latest-blog-dark-outer2 m-b30" style="background-image:url(' + bigImg + ');">' +
      '  <div class="overlay-main bg-black opacity-04"></div>' +
      '  <div class="latest-blog-square text-white">' +
      '    <h2 class="m-t0 m-b10"><span class="text-white font-30 text-uppercase">' + escapeHtml(bigTitle) + '</span></h2>' +
      '    <p class="font-weight-300">' + escapeHtml(bigExcerpt) + '</p>' +
      '    <span class="letter-spacing-4 font-12 text-white text-uppercase">Read More</span>' +
      '    <div class="v-date text-white font-weight-700 text-uppercase">' + escapeHtml(bigDate) + '</div>' +
      '  </div>' +
      '</div>';
    rightCol.appendChild(bigEl);
  }

  function getBlogHref(blog) {
    // Link to detail page based on Type or id
    // For now, use /media/<type>/ if Type exists, otherwise /media/project/ as fallback
    // Better: use /media/<documentId> with a generic detail handler, but we don't have that route yet
    // So we map Type to the existing static detail pages
    var type = (blog.Type || "").toLowerCase();
    if (type.indexOf("market") !== -1) return "media/market/";
    if (type.indexOf("design") !== -1) return "media/design/";
    if (type.indexOf("project") !== -1) return "media/project/";
    // Fallback: use project
    return "media/project/";
    // TODO: when a generic blog detail page is created, use: return "media/blog.html?id=" + blog.documentId;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/[&<>"']/g, function (m) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m];
    });
  }

  function renderMediaIndex(blogs) {
    var section = document.querySelector("section");
    // Media index has featured + grid
    // Find featured article and grid container
    var featuredWrap = document.querySelector("article.media-card-featured");
    var gridWrap = document.querySelector("div[style*='max-width:800px']");
    if (!featuredWrap || !gridWrap) return;
    var normalized = blogs.map(normalize).filter(Boolean);
    if (normalized.length === 0) return;
    normalized.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    // Big featured card ONLY when imp:true; otherwise all cards are normal size
    var big = normalized.find(function (b) { return b.imp; });
    var small = big ? normalized.filter(function (b) { return b !== big; }) : normalized;

    // Hide featured block when there is no imp blog
    var featuredSection = featuredWrap.closest("div");
    if (!big && featuredSection) {
      featuredSection.style.display = "none";
    } else if (big && featuredSection) {
      featuredSection.style.display = "";
    }

    // Render featured ONLY when imp:true
    if (big) {
      var bigImg = getImageUrl(big.image) || "../images/blog/square/pic1.jpg";
      var bigType = big.Type || "Project";
      var bigDate = formatDate(big.date);
      var bigReading = big.ReadingTime ? big.ReadingTime + " min read" : "";
      var bigTitle = big.Title || "Untitled";
      var bigExcerpt = getExcerpt(big);
      var bigHref = getBlogHrefForMedia(big);

      // Update featured article's inner HTML
      var featuredLink = featuredWrap.querySelector("a");
      var featuredImg = featuredWrap.querySelector("img");
      if (featuredImg) { featuredImg.src = bigImg; featuredImg.alt = bigTitle; }
      if (featuredLink) { featuredLink.href = bigHref; }
      var typeSpan = featuredWrap.querySelector("span[style*='color:#777']");
      if (typeSpan) typeSpan.textContent = bigType.toUpperCase();
      var dateSpans = featuredWrap.querySelectorAll("span[style*='rgba(119,119,119,0.6)']");
      if (dateSpans[0]) dateSpans[0].textContent = bigDate;
      var titleLink = featuredWrap.querySelector("h3 a");
      if (titleLink) { titleLink.textContent = bigTitle; titleLink.href = bigHref; }
      var excerptP = featuredWrap.querySelector("p[style*='color:#777']");
      if (excerptP) excerptP.textContent = bigExcerpt;
      var readingP = featuredWrap.querySelectorAll("p[style*='letter-spacing:0.16em']");
      if (readingP[0]) readingP[0].textContent = bigReading || readingP[0].textContent;
    }

    // Render grid: clear and repopulate
    var gridContainer = gridWrap;
    gridContainer.innerHTML = "";
    small.forEach(function (blog) {
      var imgUrl = getImageUrl(blog.image) || "../images/blog/landscap-half/pic2.jpg";
      var type = blog.Type || "Design";
      var dateStr = formatDate(blog.date);
      var title = blog.Title || "Untitled";
      var excerpt = getExcerpt(blog);
      var href = getBlogHrefForMedia(blog);
      var reading = blog.ReadingTime ? blog.ReadingTime + " min read" : "";
      var art = document.createElement("article");
      art.className = "media-card";
      art.style.cssText = "display:flex; flex-direction:column; padding:12px; max-width:420px;";
      art.innerHTML =
        '<a href="' + href + '" style="display:block; overflow:hidden; border-radius:12px; background:#f5f5f5;"><img src="' + imgUrl + '" alt="' + escapeHtml(title) + '" style="width:100%; aspect-ratio:16/11; object-fit:cover;" class="img-zoom"></a>' +
        '<div style="flex:1; display:flex; flex-direction:column; padding-top:20px;">' +
        '  <div style="display:flex; align-items:center; gap:12px; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; font-family:\'Inter\',sans-serif;"><span style="color:#777;">' + escapeHtml(type) + '</span><span style="width:16px; height:1px; background:#e9e9e9;"></span><span style="color:rgba(119,119,119,0.6);">' + escapeHtml(dateStr) + '</span></div>' +
        '  <h3 class="display" style="margin-top:16px; font-size:16px; line-height:1.4;"><a href="' + href + '" style="color:inherit; text-decoration:none;">' + escapeHtml(title) + '</a></h3>' +
        '  <p style="margin-top:12px; font-size:14px; line-height:1.6; color:#777; font-family:\'Inter\',sans-serif;">' + escapeHtml(excerpt) + '</p>' +
        '  <p style="margin-top:20px; font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:rgba(119,119,119,0.7); font-family:\'Inter\',sans-serif;">' + escapeHtml(reading) + '</p>' +
        '</div>';
      gridContainer.appendChild(art);
    });
  }

  function getBlogHrefForMedia(blog) {
    var type = (blog.Type || "").toLowerCase();
    if (type.indexOf("market") !== -1) return "market/";
    if (type.indexOf("design") !== -1) return "design/";
    if (type.indexOf("project") !== -1) return "project/";
    // For media/index.html, links are relative to media/
    // So return type + "/"
    if (window.location.pathname.indexOf("/media/") !== -1 && window.location.pathname.split("/").length <= 4) {
      // we are on /media/index.html, so href should be "design/" etc.
      if (type) return type.toLowerCase() + "/";
    }
    return "media/" + (type || "project") + "/";
  }

  function blogStringToHtml(text) {
    // Blog field stored as a plain string with newlines. Convert to styled blocks.
    var blocks = text.split(/\r?\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
    var out = "";
    blocks.forEach(function (block) {
      // Heuristic: short line without sentence-ending punctuation = heading
      var isHeading = block.length <= 70 && !/[.!?…]$/.test(block) && !/^[A-Z][^.!?]*\.\s+[A-Z]/.test(block.slice(0, 40)) && block.split(" ").length <= 9;
      if (isHeading) {
        out += '<h2 class="display" style="margin-top:28px; font-size: clamp(1.2rem,2.2vw,1.5rem); line-height:1.3;">' + escapeHtml(block) + '</h2>';
      } else {
        out += '<p style="font-size:16px; line-height:1.85; color:#777; font-family:\'Inter\',sans-serif;">' + escapeHtml(block) + '</p>';
      }
    });
    return out;
  }

  function renderDetailPage(blogs) {
    // For /media/design/, /media/market/, /media/project/
    var path = window.location.pathname;
    var typeMap = {
      "/media/design": "design",
      "/media/market": "market",
      "/media/project": "project"
    };
    var expectedType = null;
    for (var k in typeMap) {
      if (path.indexOf(k) !== -1) expectedType = typeMap[k];
    }
    if (!expectedType) return;
    var normalized = blogs.map(normalize).filter(Boolean);
    // Find blog with matching Type (case-insensitive)
    var blog = normalized.find(function (b) { return (b.Type || "").toLowerCase().indexOf(expectedType) !== -1; });
    if (!blog) {
      blog = normalized[0];
    }
    if (!blog) return;

    // Update hero — use the Strapi-uploaded image
    var heroImg = document.querySelector("section[style*='min-height:35vh'] img");
    if (heroImg) {
      var imgUrl = getImageUrl(blog.image);
      if (imgUrl) heroImg.src = imgUrl;
      heroImg.alt = blog.Title || heroImg.alt;
    }
    var typeEl = document.querySelector("section[style*='min-height:35vh'] p[style*='letter-spacing:0.28em']");
    if (typeEl) {
      var reading = blog.ReadingTime ? blog.ReadingTime + " min read" : "";
      typeEl.textContent = (blog.Type || expectedType) + (reading ? " · " + reading : "");
    }
    var titleEl = document.querySelector("section[style*='min-height:35vh'] h1");
    if (titleEl) titleEl.textContent = blog.Title || titleEl.textContent;
    var metaEl = document.querySelector("section[style*='min-height:35vh'] p[style*='color:rgba(255,255,255,0.75)']");
    if (metaEl) {
      metaEl.textContent = "Unitya Living · " + formatDate(blog.date);
    }

    // Update article body — target the 672px container (article itself is 1400px)
    var bodyWrap = document.querySelector("article div[style*='max-width:672px']");
    if (bodyWrap) {
      var displayP = bodyWrap.querySelector("p.display");
      if (displayP && blog.shortTag) displayP.textContent = blog.shortTag;
      var contentDiv = bodyWrap.querySelector("div[style*='flex-direction:column']");
      if (contentDiv) {
        var blogHtml = "";
        if (typeof blog.Blog === "string" && blog.Blog.trim()) {
          blogHtml = blogStringToHtml(blog.Blog);
        } else if (Array.isArray(blog.Blog)) {
          blogHtml = blog.Blog.map(function (block) {
            if (block.type === "paragraph") {
              var text = (block.children || []).map(function (c) { return escapeHtml(c.text || ""); }).join("");
              return '<p style="font-size:16px; line-height:1.85; color:#777; font-family:\'Inter\',sans-serif;">' + text + '</p>';
            } else if (block.type === "heading") {
              var text = (block.children || []).map(function (c) { return escapeHtml(c.text || ""); }).join("");
              return '<h2 class="display" style="margin-top:28px; font-size: clamp(1.2rem,2.2vw,1.5rem); line-height:1.3;">' + text + '</h2>';
            } else if (block.type === "quote") {
              var text = (block.children || []).map(function (c) { return escapeHtml(c.text || ""); }).join("");
              return '<blockquote style="border-left:2px solid #e9e9e9; padding-left:24px; margin:0; font-family:\'Poppins\', sans-serif; font-size:17px; line-height:1.6; font-style:italic; color:#111;">' + text + '</blockquote>';
            } else if (block.type === "list") {
              var items = (block.children || []).map(function (li) {
                var t = (li.children || []).map(function (c) { return escapeHtml(c.text || ""); }).join("");
                return "<li>" + t + "</li>";
              }).join("");
              return '<ul style="font-size:16px; line-height:1.85; color:#777; font-family:\'Inter\',sans-serif; padding-left:20px;">' + items + "</ul>";
            }
            return "";
          }).join("");
        }
        // Append Ending
        if (blog.Ending) {
          blogHtml += '<blockquote style="border-left:2px solid #e9e9e9; padding-left:24px; margin:0; font-family:\'Poppins\', sans-serif; font-size:17px; line-height:1.6; font-style:italic; color:#111;">' + escapeHtml(blog.Ending) + '</blockquote>';
        }
        contentDiv.innerHTML = blogHtml;
      }
    }

    // Render related / continue reading (dynamic, Strapi only)
    renderRelated(normalized, blog);
  }

  function renderRelated(allBlogs, current) {
    var grid = document.getElementById("related-grid");
    if (!grid) return;
    var others = allBlogs.filter(function (b) { return b !== current && (b.id !== current.id) && (b.documentId !== current.documentId); });
    // take up to 2, most recent first
    others.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    others = others.slice(0, 2);
    if (others.length === 0) return;
    grid.innerHTML = "";
    others.forEach(function (blog) {
      var imgUrl = getImageUrl(blog.image) || "../images/media/hero-building.jpg";
      var type = blog.Type || "Design";
      var dateStr = formatDate(blog.date);
      var title = blog.Title || "Untitled";
      var href = getBlogHrefForMedia(blog);
      var art = document.createElement("article");
      art.style.cssText = "border:1px solid #e9e9e9; border-radius:20px; background:#fff; padding:12px; max-width:420px;";
      art.innerHTML =
        '<a href="' + href + '" style="display:block; overflow:hidden; border-radius:12px;"><img src="' + imgUrl + '" alt="' + escapeHtml(title) + '" style="width:100%; aspect-ratio:16/11; object-fit:cover;"></a>' +
        '<div style="padding-top:20px;">' +
        '  <div style="display:flex; gap:12px; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; font-family:\'Inter\',sans-serif; color:#777;"><span>' + escapeHtml(type) + '</span><span style="width:16px; height:1px; background:#e9e9e9;"></span><span style="color:rgba(119,119,119,0.6);">' + escapeHtml(dateStr) + '</span></div>' +
        '  <h3 class="display" style="margin-top:12px; font-size:16px;"><a href="' + href + '" style="color:inherit; text-decoration:none;">' + escapeHtml(title) + '</a></h3>' +
        '</div>';
      grid.appendChild(art);
    });
  }


  function init() {
    var path = window.location.pathname;
    var isHome = path === "/" || path === "/index.html" || path.endsWith("/index.html") && path.split("/").length <= 3 && (path === "/index.html" || path === "/");
    // More robust: check if we are on homepage by looking for #media section with Latest Blog
    var isHomepage = !!document.getElementById("media") && document.querySelector("#media .section-head h2") && document.querySelector("#media .section-head h2").textContent.indexOf("Latest Blog") !== -1;
    var isMediaIndex = path.indexOf("/media") !== -1 && (path === "/media/" || path === "/media/index.html" || path === "/media");
    var isDetail = path.indexOf("/media/design") !== -1 || path.indexOf("/media/market") !== -1 || path.indexOf("/media/project") !== -1;

    // Decide what to fetch — use client-side filtering to avoid 403 on filtered queries
    if (isHomepage) {
      fetchBlogs({ "sort": "date:desc", "pagination[pageSize]": "25" }).then(function (blogs) {
        if (blogs && blogs.length > 0) renderHomepage(blogs);
      });
    } else if (isMediaIndex) {
      fetchBlogs({ "sort": "date:desc", "pagination[pageSize]": "25" }).then(function (blogs) {
        if (blogs && blogs.length > 0) renderMediaIndex(blogs);
      });
    } else if (isDetail) {
      // For detail, fetch all and find matching
      fetchBlogs({ "sort": "date:desc", "pagination[pageSize]": "25" }).then(function (blogs) {
        if (blogs && blogs.length > 0) renderDetailPage(blogs);
      });
    } else {
      // Check if we are on homepage via alternative detection (for clean URL /)
      if (document.getElementById("media")) {
        fetchBlogs({ "sort": "date:desc", "pagination[pageSize]": "25" }).then(function (blogs) {
          if (blogs && blogs.length > 0) renderHomepage(blogs);
        });
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
