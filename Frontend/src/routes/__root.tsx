import { HeadContent, Scripts, createRootRouteWithContext, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { QueryClient } from "@tanstack/react-query";

function NotFoundComponent() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <div style={{ maxWidth: 480 }}>
        <h1
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontWeight: 800,
            fontSize: 80,
            margin: 0,
            color: "#111",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontFamily: "'Poppins',sans-serif",
            fontWeight: 600,
            fontSize: 22,
            margin: "16px 0 8px",
            color: "#111",
          }}
        >
          Page not found
        </h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, color: "#777", margin: 0 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ marginTop: 28 }}>
          <Link
            to="/"
            className="site-button outline black"
            style={{
              padding: "14px 44px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Unitya Living — Architecture, Interiors, Construction & Real Estate, Indore" },
      {
        name: "description",
        content:
          "Unitya Living — luxury architecture, interiors, construction and real estate in Indore. Crafting premium homes and living spaces with timeless design.",
      },
      {
        name: "keywords",
        content:
          "Unitya Living, luxury homes Indore, architecture Indore, interior design Indore, real estate Indore, premium villas, construction Indore, luxury living",
      },
      { name: "author", content: "Unitya Living" },
    ],
    links: [
      { rel: "icon", href: "/images/favicon.ico", type: "image/x-icon" },
      { rel: "shortcut icon", type: "image/x-icon", href: "/images/favicon.png" },
      { rel: "stylesheet", href: "/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "/css/style.css" },
    ],
  }),

  shellComponent: RootShell,
  component: () => null,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
