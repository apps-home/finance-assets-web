import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import auth from './shared/lib/auth'

export async function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl

	if (
		pathname.startsWith('/api') ||
		pathname === '/sign-in' ||
		pathname === '/sign-up'
	) {
		return NextResponse.next()
	}

	const session = await auth.api.getSession({
		headers: req.headers
	})

	if (!session) {
		console.log(`[Proxy] Bloqueando acesso a: ${pathname}`)
		console.log('[Proxy] Request: ', req)
		return NextResponse.redirect(new URL('/sign-in', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|sign-in|sign-up).)*',
		'/profile/:path*'
	]
}
