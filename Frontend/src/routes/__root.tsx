import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import type { RouterSubscriber } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { SiteProvider } from "@/lib/site-context";
import { fetchSite } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function usePageViewTracking() {
  const router = useRouter();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const sendPageView = () => {
      // The gtag config snippet already fires page_view on the initial page
      // load; only track subsequent client-side navigations.
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
        return;
      }
      try {
        const { pathname, search, hash } = router.state.location;
        window.gtag?.("event", "page_view", {
          page_path: `${pathname}${search}${hash}`,
          page_title: document.title,
        });
      } catch {
        // Analytics must never break navigation.
      }
    };
    const unsubscribe = router.subscribe("onResolved", sendPageView);
    return unsubscribe;
  }, [router]);
}

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="relative z-10 max-w-md text-center">
        <p className="font-serif text-[6rem] leading-none text-brand">404</p>
        <h1 className="mt-4 font-display text-3xl text-foreground">This page has moved on</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you are looking for is no longer here. Let us take you back.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-charcoal px-8 text-sm font-medium text-white transition-colors duration-300 hover:bg-brand"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="h-12 cursor-pointer rounded-full bg-charcoal px-8 text-sm font-medium text-white transition-colors duration-300 hover:bg-brand"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex h-12 items-center border border-border px-8 text-[0.7rem] tracking-[0.14em] uppercase"
          >
            Go home
          </a>
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
      { title: "Unitya Living — Thoughtful Homes in Indore" },
      {
        name: "description",
        content:
          "Unitya Living builds considered residences in Indore, Madhya Pradesh — where living finds its meaning.",
      },
      { name: "author", content: "Unitya Living" },
      { name: "google-adsense-account", content: "ca-pub-4893209698743849" },
      { property: "og:site_name", content: "Unitya Living" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4893209698743849",
        async: true,
        crossOrigin: "anonymous",
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-8R20S13F6M",
        async: true,
      },
      {
        children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-8R20S13F6M');`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  loader: async () => {
    const site = await fetchSite();
    return { site };
  },
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { site } = Route.useLoaderData();

  usePageViewTracking();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteProvider site={site}>
        <Header />
        <main>
          {/* Required: nested routes render here. */}
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster position="bottom-left" />
      </SiteProvider>
    </QueryClientProvider>
  );
}
