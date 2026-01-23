import { headers } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { auth } from '@/shared/lib/auth'

export interface SignInBody {
	email: string
	password: string
	rememberMe?: boolean
	callbackURL?: string
}

export async function POST(req: NextRequest) {
	const body: SignInBody = await req.json()

	const data = await auth.api.signInEmail({
		body: {
			email: body.email,
			password: body.password,
			rememberMe: body.rememberMe,
			callbackURL: body.callbackURL || 'https://example.com/callback'
		},
		// This endpoint requires session cookies.
		headers: await headers()
	})

	return NextResponse.json(data)
}
