import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request : NextRequest){

    if (request.nextUrl.pathname.includes('/dashboard') || request.nextUrl.pathname.includes('/repositories')){
        console.log('Middleware hit : ', request.nextUrl.pathname)       
    }
    return NextResponse.next();
}

export const config = {
    matcher : ['/dashboard/:path*', '/repositories/:path*']
}

