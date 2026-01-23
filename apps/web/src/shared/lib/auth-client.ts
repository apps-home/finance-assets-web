import { createAuthClient } from 'better-auth/react'

// Use a URL base dinâmica para suportar acesso via localhost ou IP da rede
const getBaseURL = () => {
	if (typeof window !== 'undefined') {
		return window.location.origin
	}
	return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
}

export const authClient = createAuthClient({
	baseURL: getBaseURL()
})

export const { signIn, signUp, signOut, useSession } = authClient
