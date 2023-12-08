import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

const beforeAuthMiddleware = (req: NextRequest) => {
	console.log(`Before auth fired`)
}

export default authMiddleware({
	publicRoutes: ['/'],
	beforeAuth: (req) => {
		// Execute next-intl middleware before Clerk's auth middleware
		return beforeAuthMiddleware(req)
	},
	afterAuth(auth, req, evt) {
		console.log(`User ID: ${auth.userId ?? 'none'}`)

		if (!auth.userId && !auth.isPublicRoute) {
		  return redirectToSignIn({ returnBackUrl: req.url });
		}
		
		// TODO: Change this redirect to their dashboard eventually
		if(auth.userId) {
		  const comboBuilder = new URL('/combo-builder', req.url)
		  return NextResponse.redirect(comboBuilder)
		}
	}
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}