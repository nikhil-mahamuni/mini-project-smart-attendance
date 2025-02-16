import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("teacherToken")?.value;
  const { pathname } = request.nextUrl;

  // Define protected routes
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isLoginRoute = pathname === "/auth";
  const isProtectedApiRoute = pathname.startsWith("/api/teacher/teacher-data");

  // Redirect if user is not authenticated but trying to access dashboard
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Redirect if authenticated user tries to access login page
  if (token && isLoginRoute) {
    return NextResponse.redirect(new URL("/dashboard/home", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/dashboard/:path*", "/api/teacher/teacher-data"],
};
