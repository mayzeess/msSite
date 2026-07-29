import { auth } from "@/auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth;

    const pathname = req.nextUrl.pathname;

    const isAdminPage = pathname.startsWith("/admin");
    const isLoginPage = pathname === "/admin/login";


    if (isAdminPage && !isLoggedIn && !isLoginPage) {
        return Response.redirect(
            new URL("/admin/login", req.nextUrl.origin)
        );
    }
});

export const config = {
    matcher: [
        "/admin/:path*",
    ],
};