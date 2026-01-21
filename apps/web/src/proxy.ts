import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
	console.log('Proxying request to API:', req.url)
}

export const config = {
	matcher: ['/api/:path*|_next/static|_next/image|favicon.ico|']
}
