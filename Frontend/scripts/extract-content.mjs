const fs = require("fs");
const path = require("path");

const SRC = "/Users/vdswebsupport/Development/UnityLiving/new_frontend";
const OUT = "/Users/vdswebsupport/Development/UnityLiving/Frontend/src/content";

const PAGES = {
  home: "index.html",
  about: "about/index.html",
  founder: "founder/index.html",
  services: "services/index.html",
  media: "media/index.html",
  "media-design": "media/design/index.html",
  "media-market": "media/market/index.html",
  "media-project": "media/project/index.html",
  projects: "projects/index.html",
};

// Route path used for each page (to decide image url() handling depth).
const ROUTE_DEPTH = {
  home: 0,
  about: 0,
  founder: 0,
  services: 0,
  media: 0,
  "media-design": 1,
  "media-market": 1,
  "media-project": 1,
  projects: 0,
};

// Literal href rewrites: relative template links -> absolute app routes.
const HREF_MAP = [
  ["projects/project-detail.html?project=cafe-cotta", "/projects/cafe-cotta"],
  ["projects/project-detail.html?project=hillcrest-residence", "/projects/hillcrest-residence"],
  ["projects/project-detail.html?project=nest-apartments", "/projects/nest-apartments"],
  ["projects/project-detail.html?project=studio-loft", "/projects/studio-loft"],
  ["projects/project-detail.html?project=courtyard-house", "/projects/courtyard-house"],
  ["projects/project-detail.html?project=paters-hill-residence", "/projects/paters-hill-residence"],
  ["projects/project-detail.html?project=arcadia-hub", "/projects/arcadia-hub"],
  ["index.html#contact", "/#contact"],
  ["index.html", "/"],
  ["about-1.html", "/about"],
  ["about/", "/about"],
  ["founder/", "/founder"],
  ["projects/", "/projects"],
  ["services/", "/services"],
  ["media/design/", "/media/design"],
  ["media/market/", "/media/market"],
  ["media/project/", "/media/project"],
  ["media/", "/media"],
];

function read(f) {
  return fs.readFileSync(path.join(SRC, f), "utf8");
}

function between(html, startMarker, endMarker) {
  const s = html.indexOf(startMarker);
  const e = html.indexOf(endMarker, s >= 0 ? s : 0);
  if (s < 0 || e < 0) throw new Error("markers not found: " + startMarker + " / " + endMarker);
  return html.slice(s + startMarker.length, e);
}

function stripScripts(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "");
}

function normalize(h, name) {
  // 1. literal href rewrites first (before generic path munging).
  for (const [from, to] of HREF_MAP) {
    h = h.split(`href="${from}"`).join(`href="${to}"`);
    h = h.split(`href="../${from}"`).join(`href="${to}"`);
    h = h.split(`href="../../${from}"`).join(`href="${to}"`);
  }

  // "back to media index" links inside the media/* sub-pages.
  h = h.split('href="../"').join('href="/media"');

  // 2. src/href absolute-ize for asset paths (css, fonts, images, js, plugins, uploads).
  h = h.replace(
    /(src|href)=(["'])((?:\.\.\/)*(?:css|fonts|images|js|plugins|uploads)\/[^"']*)\2/gi,
    (m, attr, q, p) => `${attr}=${q}/${p.replace(/^(?:\.\.\/)+/, "")}${q}`,
  );

  // 3. url(...) inside inline styles.
  h = h.replace(
    /url\((['"]?)((?:\.\.\/)*(?:css|fonts|images|js|plugins|uploads)\/[^'")\s]+)\1\)/gi,
    (m, q, p) => `url(${q}/${p.replace(/^(?:\.\.\/)+/, "")}${q})`,
  );

  // 4. Remaining ../ on anchor hrefs (nav back-links like ../projects/) -> strip to top level.
  h = h.replace(/(href)=(["'])((?:\.\.\/)+)([^"']*)\2/gi, (m, attr, q, up, rest) => {
    if (/^(css|fonts|images|js|plugins|uploads)\//.test(rest)) {
      return `${attr}=${q}/${rest}${q}`;
    }
    if (rest === "index.html#contact") return `${attr}=${q}/#contact${q}`;
    if (rest === "index.html") return `${attr}=${q}/${q}`;
    if (/^[a-z-]+\/$/.test(rest)) return `${attr}=${q}/${rest}${q}`;
    if (/^[a-z-]+\/index\.html/.test(rest))
      return `${attr}=${q}/${rest.replace(/index\.html$/, "")}${q}`;
    return m;
  });

  return h.trim();
}

// ---- Hero slide extraction (home) ----
function extractHeroSlides(homeHtml) {
  const slides = [];
  const liRe = /<li\b[^>]*data-index="rs-[\d]+"[^>]*>([\s\S]*?)<\/li>/g;
  let m;
  while ((m = liRe.exec(homeHtml)) !== null) {
    const block = m[0];
    const img =
      /<img\b[^>]*\bsrc="([^"]+)"[^>]*class="rev-slidebg"/.exec(block) ||
      /<img\b[^>]*class="rev-slidebg"[^>]*\bsrc="([^"]+)"/.exec(block);
    const titleMatch =
      /<div class="tp-caption BigBold-Title[\s\S]*?<span class="text-yellow">([^<]*)<\/span>\s*([^<]*)<\/div>/.exec(
        block,
      );
    const subMatch = /<div class="tp-caption BigBold-SubTitle[\s\S]*?>\s*([^<]*)<\/div>/.exec(
      block,
    );
    const hasButton = /BigBold-Button/.test(block);
    if (!img) continue;
    slides.push({
      image: img[1],
      titleYellow: titleMatch ? titleMatch[1].trim() : "",
      title: titleMatch ? titleMatch[2].trim() : "",
      subtitle: subMatch ? subMatch[1].trim() : "",
      button: hasButton,
    });
  }
  return slides;
}

function heroSlidesToTs(slides) {
  const lines = slides.map(
    (s, i) =>
      `  {\n    image: ${JSON.stringify("/" + s.image)},\n    titleYellow: ${JSON.stringify(s.titleYellow)},\n    title: ${JSON.stringify(s.title)},\n    subtitle: ${JSON.stringify(s.subtitle)},\n    button: ${JSON.stringify(s.button)},\n  },`,
  );
  return `export type HeroSlide = {\n  image: string;\n  titleYellow: string;\n  title: string;\n  subtitle: string;\n  button: boolean;\n};\n\nexport const heroSlides: HeroSlide[] = [\n${lines.join("\n")}\n];\n`;
}

// ---- main ----
const homeHtml = read(PAGES.home);
const heroSlides = extractHeroSlides(homeHtml);
fs.writeFileSync(
  "/Users/vdswebsupport/Development/UnityLiving/Frontend/src/lib/data/hero-slides.ts",
  heroSlidesToTs(heroSlides),
);

for (const [name, file] of Object.entries(PAGES)) {
  const html = read(file);
  let body;
  if (name === "home") {
    body = between(html, "<!-- SLIDER END -->", '<section id="enquire"');
  } else {
    body = between(html, "</header>", '<section id="enquire"');
  }
  body = stripScripts(body);
  // Drop the wrapping page-content div that the routes add themselves.
  body = body.replace(/^\s*<div class="page-content">\s*/, "");
  const clean = normalize(body, name);
  fs.writeFileSync(path.join(OUT, name + ".html"), clean);
  console.log(name, "->", clean.length, "chars");
}

console.log("hero slides:", heroSlides.length);
