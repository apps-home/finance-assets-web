import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { auth } from '@/shared/lib/auth'

export async function GET(req: NextRequest) {
	const { getSession } = auth.api
	console.log('cookies', req.cookies)
	console.log('headers', req.headers)

	const session = await getSession({
		headers: req.headers
	})

	console.log('SESSION', session)

	return NextResponse.json(session)
}
