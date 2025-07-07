import { withAuth } from 'next-auth/middleware';

export default withAuth(
	function middleware(req) {
		// Middleware logic runs for protected routes
		console.log('Protected route accessed:', req.nextUrl.pathname);
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				// Return true if user is authenticated
				return !!token;
			},
		},
		pages: {
			signIn: '/auth/signin',
		},
	},
);

export const config = {
	// Protect all routes except auth pages and public assets
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - auth (authentication pages)
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - files with extensions (e.g. .png, .jpg, .svg)
		 */
		'/((?!auth|api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
	],
};
