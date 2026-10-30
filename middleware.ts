import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  if (hostname !== "www.ciuson.ro") return NextResponse.next();

  const destination = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    "https://ciuson.ro"
  );
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
