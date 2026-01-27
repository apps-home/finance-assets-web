import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/shared/lib/current-user'

import ProfileClient from './ProfileClient'

interface ProfilePageProps {
	searchParams: Promise<{ tab?: string }>
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
	const session = await getCurrentSession()
	const resolvedSearchParams = await searchParams

	if (!session) {
		redirect('/sign-in')
	}

	return (
		<main>
			<ProfileClient
				user={session.user}
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
