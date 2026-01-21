import { env } from '@finance-assets-web/env/web'
import { prisma } from '@lib/db'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET,
	baseUrl: env.BETTER_AUTH_URL,
	database: prismaAdapter(prisma, {
		provider: 'postgresql'
	}),
	emailAndPassword: {
		enabled: true
	}
})

export default auth
