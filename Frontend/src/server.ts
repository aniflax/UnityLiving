import fs from "node:fs";
import path from "node:path";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// Clean URL -> static file mapping (served without redirect, so URL stays clean)
const STATIC_MAP: Record<string, string> = {
  "/": "/index.html",
  "/about": "/about/index.html",
  "/founder": "/founder/index.html",
  "/services": "/services/index.html",
  "/media": "/media/index.html",
  "/media/design": "/media/design/index.html",
  "/media/market": "/media/market/index.html",
  "/media/project": "/media/project/index.html",
  "/projects": "/projects/index.html",
  "/projects/detail": "/projects/detail/index.html",
};

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const pathname = normalizePath(url.pathname);

      // Handle clean URLs for static pages
      let filePath: string | null = STATIC_MAP[pathname] ?? null;
      let isProjectDetail = false;
      let projectSlug: string | null = null;

      if (!filePath && pathname.startsWith("/projects/")) {
        const slug = pathname.slice("/projects/".length).split("/")[0];
        if (slug && slug !== "index.html" && !slug.includes(".")) {
          filePath = "/projects/project-detail.html";
          isProjectDetail = true;
          projectSlug = slug;
        }
      }

      if (filePath) {
        // Try to serve static file directly, keeping URL clean (no redirect)
        try {
          // In Cloudflare Workers, try ASSETS binding first
          const cfEnv = env as Record<string, unknown>;
          if (cfEnv && typeof cfEnv["ASSETS"] === "object" && cfEnv["ASSETS"] !== null) {
            const assets = cfEnv["ASSETS"] as { fetch: typeof fetch };
            const assetUrl = new URL(filePath, url.origin);
            // Preserve original search for non-project pages; for project detail we handle slug separately
            const assetRequest = new Request(assetUrl.toString(), { headers: request.headers });
            const assetRes = await assets.fetch(assetRequest);
            if (assetRes.ok) {
              let body = await assetRes.text();
              if (isProjectDetail && projectSlug) {
                body = patchProjectDetailHtml(body, projectSlug);
              }
              return new Response(body, {
                status: 200,
                headers: {
                  "content-type": "text/html; charset=utf-8",
                  "cache-control": "public, max-age=0, must-revalidate",
                },
              });
            }
          }
        } catch {
          // fall through to fs attempt
        }

        // Dev / Node fallback: read from public directory via fs
        try {
          const publicDir = path.join(process.cwd(), "public");
          const fullPath = path.join(publicDir, filePath);
          if (fs.existsSync(fullPath)) {
            let body = fs.readFileSync(fullPath, "utf-8");
            if (isProjectDetail && projectSlug) {
              body = patchProjectDetailHtml(body, projectSlug);
            }
            return new Response(body, {
              status: 200,
              headers: {
                "content-type": "text/html; charset=utf-8",
                "cache-control": "public, max-age=0, must-revalidate",
              },
            });
          }
        } catch {
          // fall through to TanStack handler
        }
      }

      const handler = await getServerEntry();
      return await handler.fetch(request, env, ctx);
    } catch (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

function patchProjectDetailHtml(html: string, slug: string): string {
  // The original static file reads slug from ?project= query param.
  // For clean URL /projects/<slug>, inject the slug so the page works without query.
  // Replace the line that reads from URLSearchParams to also check pathname.
  const original = `var slug = params.get("project") || "hillcrest-residence";`;
  const patched = `var slug = params.get("project") || (window.location.pathname.match(/\\/projects\\/([^\\/\\?#]+)/) || [])[1] || "${slug}" || "hillcrest-residence";`;
  if (html.includes(original)) {
    return html.replace(original, patched);
  }
  // Fallback: inject a small script that sets the query param from pathname before the original script runs
  const inject = `<script>try{var _m=window.location.pathname.match(/\\/projects\\/([^\\/\\?#]+)/);if(_m&&!new URLSearchParams(window.location.search).get("project")){var _u=new URL(window.location.href);_u.searchParams.set("project",_m[1]);history.replaceState(null,"",_u.toString());}}catch(e){}</script>`;
  return html.replace("</head>", `${inject}</head>`);
}
