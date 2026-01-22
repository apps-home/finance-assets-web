import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { auth } from '@/shared/lib/auth'

export async function GET() {
	const { getSession } = auth.api

	const session = await getSession({
		headers: await headers()
	})

	console.log('SESSION', session)

	return NextResponse.json(session)
}
