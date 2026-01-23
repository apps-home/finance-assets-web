import { env } from '@finance-assets-web/env/web'
import { prisma } from '@lib/db'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET,
	baseURL: env.BETTER_AUTH_URL,
	trustedOrigins: [
		'http://localhost:3001',
		'http://127.0.0.1:3001',
		'http://192.168.0.9:3001'
	],
	database: prismaAdapter(prisma, {
		provider: 'postgresql'
	}),
	emailAndPassword: {
		enabled: true
	},
	plugins: [nextCookies()]
})

export default auth
