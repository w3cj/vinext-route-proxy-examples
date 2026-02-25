import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/middleware-redirect") {
    return NextResponse.redirect(new URL("/about", request.url), {
      headers: { "set-cookie": "middleware-redirect=success; Path=/" },
    });
  }

  if (pathname === "/middleware-rewrite") {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (pathname === "/middleware-blocked") {
    return new Response("Blocked by middleware", { status: 403 });
  }

  const response = NextResponse.next();
  response.headers.set("x-middleware-pathname", pathname);
  response.headers.set("x-middleware-ran", "true");

  if (request.cookies.get("session")) {
    response.headers.set("x-middleware-has-session", "true");
  }

  return response;
}

export const config = {
  matcher: [
    "/about",
    "/middleware-redirect",
    "/middleware-rewrite",
    "/middleware-blocked",
    "/",
  ],
};
