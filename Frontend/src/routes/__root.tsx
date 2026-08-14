import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal px-4">
      <div className="relative z-10 max-w-md text-center">
        <p className="font-display text-[6rem] leading-none text-cream">404</p>
        <h1 className="mt-4 font-display text-2xl text-cream">This page has moved on</h1>
        <p className="mt-3 text-sm text-cream/60">
          The page you are looking for is no longer here. Let us take you back.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center justify-center border border-cream/30 px-8 text-[0.7rem] tracking-[0.14em] text-cream uppercase transition-colors duration-500 hover:border-gold hover:text-gold"
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
            className="h-12 cursor-pointer bg-charcoal px-8 text-[0.7rem] tracking-[0.14em] text-charcoal-foreground uppercase"
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
      { title: "Unityaliving — Thoughtful Homes in Indore" },
      {
        name: "description",
        content:
          "Unityaliving builds considered residences in Indore, Madhya Pradesh — where living finds its meaning.",
      },
      { name: "author", content: "Unityaliving" },
      { property: "og:site_name", content: "Unityaliving" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&family=Manrope:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
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

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="bottom-left" />
    </QueryClientProvider>
  );
}
