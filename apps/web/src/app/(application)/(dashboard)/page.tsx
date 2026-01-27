import { redirect } from 'next/navigation'

import { getCurrentSession } from '@/shared/lib/current-user'

import DashboardClient from './DashboardClient'

export interface MonthData {
	month: string
	monthIndex: number
	[key: string]: string | number
}

export default async function DashboardPage() {
	const session = await getCurrentSession()

	if (!session) {
		return redirect('/sign-in')
	}

	return <DashboardClient />
}
