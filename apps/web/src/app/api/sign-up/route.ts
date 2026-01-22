import { type NextRequest, NextResponse } from 'next/server'

import { auth } from '@/shared/lib/auth'

export interface SignUpBody {
	name: string
	email: string
	password: string
	image?: string
	callbackURL?: string
}

export async function POST(req: NextRequest) {
	const body: SignUpBody = await req.json()

	const data = await auth.api.signUpEmail({
		body: {
			name: body.name,
			email: body.email,
			password: body.password,
			image: body.image || 'https://example.com/image.png',
			callbackURL: body.callbackURL || 'https://example.com/callback'
		}
	})

	return NextResponse.json(data)
}
