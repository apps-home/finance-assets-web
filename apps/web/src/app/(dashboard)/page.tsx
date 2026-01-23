import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/shared/lib/current-user'
import { initialData } from '@/shared/utils/initialData'

import DashboardClient from './DashboardClient'

export default async function Dashboard() {
	const session = await getCurrentSession()

	console.log('Session', session)

	if (!session) {
		return redirect('/sign-in')
	}

	return <DashboardClient initialData={initialData} />
}
