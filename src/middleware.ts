import { NextRequest, NextResponse } from "next/server";
import { auth } from "./app/auth";

export async function middleware(request: NextRequest) {
    
    console.log("Middleware is running");
    const path=request.nextUrl.pathname;
    console.log("Request path:", path);

    const session=await auth();
    console.log("Session:", session);   

    const isPublicPath = path === "/"|| path === "/login" ;


    if(!session && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if(session && isPublicPath) {
       const role=session.user.role;
       console.log("User role:", role);
       
       return NextResponse.redirect(new URL(`${role}`, request.url));
       
    }

    if(session){
        const role=session.user.role;
        if(role=== "customers" && path.startsWith("/admin")) {
            return NextResponse.redirect(new URL('/customers', request.url));
        }
    }

    if(session){
        const role=session.user.role;
        if(role=== "admin" && path.startsWith("/customers")) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();

}
export const config = {
    matcher: [
       "/","/login","/admin/:path*","/admin","/customers/:path*","/customers",
    ],
};