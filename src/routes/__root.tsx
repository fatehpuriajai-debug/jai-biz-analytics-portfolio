import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { PortfolioHeader, PortfolioFooter } from "@/components/portfolio";

declare global {
  interface Window {
    VdkEdgeWebchat?: {
      mount: (config: Record<string, unknown>) => void;
    };
    __botpressWebchatPromise?: Promise<void>;
  }
}

function initializeBotpressWebchat() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.resolve();
  }

  if (window.__botpressWebchatPromise) return window.__botpressWebchatPromise;

  window.__botpressWebchatPromise = (async () => {
    const stylesheetUrl = "https://vdk-viber-runtime-prod.bot.botpress.host/edge/webchat.css";
    const scriptUrl = "https://vdk-viber-runtime-prod.bot.botpress.host/edge/webchat.js";
    const baseUrl = "https://vdk-viber-runtime-prod.bot.botpress.host";
    const botId = "a055e2a5-c409-48d2-a9f8-777c20c3b752";

    if (!document.getElementById("botpress-webchat-styles")) {
      const stylesheet = document.createElement("link");
      stylesheet.id = "botpress-webchat-styles";
      stylesheet.rel = "stylesheet";
      stylesheet.href = stylesheetUrl;
      document.head.appendChild(stylesheet);
    }

    if (!window.VdkEdgeWebchat) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Botpress webchat script could not be loaded."));
        document.head.appendChild(script);
      });
    }

    const webchat = window.VdkEdgeWebchat;
    if (!webchat) throw new Error("Botpress webchat is unavailable.");

    const response = await fetch(`${baseUrl}/edge/bots/${botId}/config`);
    if (!response.ok) throw new Error("Botpress webchat configuration could not be loaded.");
    const { webchat: config } = (await response.json()) as { webchat: Record<string, unknown> };

    webchat.mount({ ...config, mode: "bubble", baseUrl, botId });
  })();

  return window.__botpressWebchatPromise;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
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
      { title: "Jai Fatehpuria | Personal portfolio" },
      { name: "description", content: "Jai Fatehpuria’s personal portfolio. BBA student at JECRC University, Jaipur." },
      { name: "author", content: "Jai Fatehpuria" },
      { property: "og:title", content: "Jai Fatehpuria | Personal portfolio" },
      { property: "og:description", content: "BBA student at JECRC University with interests in Business Analytics and Marketing." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;650;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" },
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

  useEffect(() => {
    void initializeBotpressWebchat().catch(() => undefined);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <PortfolioHeader />
      <Outlet />
      <PortfolioFooter />
    </QueryClientProvider>
  );
}
