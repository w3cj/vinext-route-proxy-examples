import { NextResponse } from "next/server";

export function proxy() {
  const response = NextResponse.next();
  response.headers.set("x-proxy-proxy", "5-proxy");
  return response;
}
