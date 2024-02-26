import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/options";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname == "/login" || pathname == "/recruiter/login") {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });

 
  const userProtectedRoutes = ["/"];

  
  const recruiterProtectedRoutes = ["/recruiter/dashboard"];

  if (
    token == null &&
    (userProtectedRoutes.includes(pathname) ||
      recruiterProtectedRoutes.includes(pathname))
  ) {
    return NextResponse.redirect(
      new URL(
        "/login?error=Please login first to access this route",
        request.url
      )
    );
  }

  
  const user: CustomUser | null = token?.user as CustomUser;

  
  if (recruiterProtectedRoutes.includes(pathname) && user.role == "User") {
    return NextResponse.redirect(
      new URL(
        "/recruiter/login?error=Only recruiter can access.",
        request.url
      )
    );
  }

  
  if (userProtectedRoutes.includes(pathname) && user.role == "Recruiter") {
    return NextResponse.redirect(
      new URL(
        "/login?error=Only user can login.",
        request.url
      )
    );
  }
}
