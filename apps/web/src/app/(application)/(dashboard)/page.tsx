import DashboardClient from './DashboardClient'

export interface MonthData {
	month: string
	monthIndex: number
	[key: string]: string | number
}

export default async function DashboardPage() {
	return <DashboardClient />
}
