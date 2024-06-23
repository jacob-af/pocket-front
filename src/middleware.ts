import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith("/db/inventory") &&
      request.nextauth.token?.role == "Free User"
    ) {
      return NextResponse.rewrite(new URL("/db", request.url));
    }
  },
  {
    pages: {
      signIn: "/login"
    }
  }
);

export const config = { matcher: ["/db/:path*"] };
