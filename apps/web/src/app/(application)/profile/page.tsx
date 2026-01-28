import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/shared/lib/current-user'

import ProfileClient from './ProfileClient'

interface ProfilePageProps {
	searchParams: Promise<{ tab?: string }>
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
	const user = await getCurrentUser()
	const resolvedSearchParams = await searchParams

	if (!user) {
		redirect('/sign-in')
	}

	return (
		<main>
			<ProfileClient
				user={user}
				defaultTab={resolvedSearchParams.tab || 'perfil'}
			/>
		</main>
	)
}

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Perfil',
		description: 'Gerencie as informações do seu perfil'
	}
}
