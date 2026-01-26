import { type NextRequest, NextResponse } from 'next/server'

import { auth } from '@/shared/lib/auth'

export async function GET(req: NextRequest) {
	const { getSession } = auth.api

	const session = await getSession({
		headers: req.headers
	})

	return NextResponse.json(session)
}
