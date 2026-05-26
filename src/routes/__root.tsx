import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieBanner } from "@/components/CookieBanner";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";

const MeliCat = lazy(() => import("@/components/MeliCat").then((m) => ({ default: m.MeliCat })));

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground display">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary-meliya">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground display">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-muted-foreground">Veuillez réessayer.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary-meliya"
          >
            Réessayer
          </button>
          <a href="/" className="btn-secondary-meliya">
            Accueil
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
      { title: "MELIYA Assistante digitale spécialisée" },
      {
        name: "description",
        content:
          "MELIYA structure, met en forme et valorise vos documents professionnels avec élégance.",
      },
      { property: "og:title", content: "MELIYA Assistante digitale spécialisée" },
      {
        property: "og:description",
        content: "Structuration et présentation de documents professionnels haut de gamme.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:image", content: "/favicon.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Aller au contenu
      </a>
      <div className="min-h-screen flex flex-col">
        <SmoothScroll />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <CookieBanner />
        <Suspense fallback={null}>
          <MeliCat />
        </Suspense>
        <Toaster position="bottom-right" richColors closeButton />
      </div>
    </QueryClientProvider>
  );
}
