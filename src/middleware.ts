// middleware.ts

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getSessionCookie } from "better-auth/cookies";

export function middleware(req: NextRequest) {
  const cookie = getSessionCookie(req, {
    cookiePrefix: "foneflip",
  });

  if (!cookie) {
    const redirectUrl = new URL("/auth/login", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname); // keep original path
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"], // protect these routes
};
