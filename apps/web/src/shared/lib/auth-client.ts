import { createAuthClient } from 'better-auth/react'

const getBaseURL = () => {
	if (typeof window !== 'undefined') {
		return window.location.origin
	}
	return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'
}

export const authClient = createAuthClient({
	baseURL: getBaseURL()
})

export const {
	$ERROR_CODES,
	accountInfo,
	changeEmail,
	changePassword,
	deleteUser,
	getAccessToken,
	getSession,
	linkSocial,
	listAccounts,
	listSessions,
	refreshToken,
	requestPasswordReset,
	resetPassword,
	revokeOtherSessions,
	revokeSession,
	revokeSessions,
	sendVerificationEmail,
	signIn,
	signOut,
	signUp,
	unlinkAccount,
	updateUser,
	useSession,
	verifyEmail
} = authClient
