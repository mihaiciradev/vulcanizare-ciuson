import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { INTERNAL_PATHS, PAGE_PATHS, type PageKey } from "@/lib/i18n";

const PAGES = Object.keys(PAGE_PATHS) as PageKey[];

/**
 * - www.ciuson.ro -> ciuson.ro (308).
 * - Romanian (default) has no prefix: /oferte/... is served from app/[lang=ro]/oferte/...
 * - English lives under /en with English slugs: /en/offer is served from app/[lang=en]/oferte/...
 * - Internal forms are redirected to the public ones, so every page has exactly one URL.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = url.hostname.toLowerCase();
  if (hostname === "www.ciuson.ro") {
    return NextResponse.redirect(new URL(`${url.pathname}${url.search}`, "https://ciuson.ro"), 308);
  }

  const path = url.pathname;
  // Files (robots.txt, sitemap.xml, images, models...) and Next internals are served as they are.
  if (path.startsWith("/_next") || path.startsWith("/api") || /\.[a-zA-Z0-9]+$/.test(path)) {
    return NextResponse.next();
  }

  const redirectTo = (pathname: string) => {
    const target = url.clone();
    target.pathname = pathname;
    return NextResponse.redirect(target, 308);
  };
  const rewriteTo = (pathname: string) => {
    const target = url.clone();
    target.pathname = pathname;
    return NextResponse.rewrite(target);
  };

  // /ro/... is not a public URL: Romanian has no prefix.
  if (path === "/ro" || path.startsWith("/ro/")) {
    return redirectTo(path.slice(3) || "/");
  }

  if (path === "/en" || path.startsWith("/en/")) {
    const clean = path.replace(/\/+$/, "") || "/en";
    for (const page of PAGES) {
      // Public English URL -> internal page.
      if (clean === PAGE_PATHS[page].en) return rewriteTo(`/en${INTERNAL_PATHS[page]}`);
      // Romanian slug under /en -> its English URL.
      if (page !== "home" && clean === `/en${INTERNAL_PATHS[page]}`) return redirectTo(PAGE_PATHS[page].en);
    }
    // Anything else under /en (login, unknown pages) is served as is and 404s in English if unknown.
    return NextResponse.next();
  }

  // Everything else is Romanian.
  return rewriteTo(`/ro${path === "/" ? "" : path}`);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
