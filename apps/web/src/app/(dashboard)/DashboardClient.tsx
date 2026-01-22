'use client'

import { Download, TrendingUp, Wallet } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { CategoryBreakdown } from '@/features/components/CategoryBreakdown'
import { FinancialChart } from '@/features/components/FinancialChart'
import { FinancialTable } from '@/features/components/FinancialTable'
import { StatCard } from '@/features/components/StatCard'

import type { MonthData } from './page'

export default function DashboardClient({
	initialData
}: {
	initialData: MonthData[]
}) {
	const [data, setData] = useState<MonthData[]>(initialData)
	const [selectedYear] = useState('2024')

	const stats = useMemo(() => {
		const latestMonth = data[data.length - 2]
		const total =
			latestMonth.reservaPais +
			latestMonth.reservaIrmaos +
			latestMonth.reservaLciCdb +
			latestMonth.reservaRendaFixa +
			latestMonth.fiis +
			latestMonth.dolar

		const firstMonth = data[0]
		const firstTotal =
			firstMonth.reservaPais +
			firstMonth.reservaIrmaos +
			firstMonth.reservaLciCdb +
			firstMonth.reservaRendaFixa +
			firstMonth.fiis +
			firstMonth.dolar

		const growth = ((total - firstTotal) / firstTotal) * 100

		const totalReservas = data.reduce(
			(sum, month) =>
				sum +
				month.reservaPais +
				month.reservaIrmaos +
				month.reservaLciCdb +
				month.reservaRendaFixa,
			0
		)

		const totalFiis = data.reduce((sum, month) => sum + month.fiis, 0)
		const totalDolar = data.reduce((sum, month) => sum + month.dolar, 0)

		return {
			total,
			growth,
			totalReservas,
			totalFiis,
			totalDolar
		}
	}, [data])

	const chartData = useMemo(() => {
		return data.map((month) => ({
			...month,
			total:
				month.reservaPais +
				month.reservaIrmaos +
				month.reservaLciCdb +
				month.reservaRendaFixa +
				month.fiis +
				month.dolar
		}))
	}, [data])

	const categoryData = useMemo(() => {
		const latestMonth = data[data.length - 2]
		return [
			{
				name: 'Reserva (Pais)',
				value: latestMonth.reservaPais,
				color: 'var(--chart-1)'
			},
			{
				name: 'Reserva (Irmãos)',
				value: latestMonth.reservaIrmaos,
				color: 'var(--chart-2)'
			},
			{
				name: 'LCI e CDB',
				value: latestMonth.reservaLciCdb,
				color: 'var(--chart-3)'
			},
			{
				name: 'Renda Fixa',
				value: latestMonth.reservaRendaFixa,
				color: 'var(--chart-4)'
			},
			{
				name: 'FIIs',
				value: latestMonth.fiis,
				color: 'var(--chart-5)'
			},
			{
				name: 'Dólar',
				value: latestMonth.dolar,
				color: 'var(--chart-1)'
			}
		].filter((item) => item.value > 0)
	}, [data])

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(value)
	}

	const exportData = () => {
		const csv = [
			[
				'Mês',
				'Reserva (Pais)',
				'Reserva (Irmãos)',
				'Reserva (LCI e CDB)',
				'Reserva (Renda Fixa)',
				'FIIs',
				'Dólar',
				'Total'
			],
			...data.map((row) => [
				row.month,
				row.reservaPais,
				row.reservaIrmaos,
				row.reservaLciCdb,
				row.reservaRendaFixa,
				row.fiis,
				row.dolar,
				row.reservaPais +
					row.reservaIrmaos +
					row.reservaLciCdb +
					row.reservaRendaFixa +
					row.fiis +
					row.dolar
			])
		]
			.map((row) => row.join(','))
			.join('\n')

		const blob = new Blob([csv], { type: 'text/csv' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `patrimonio_${selectedYear}.csv`
		a.click()
		URL.revokeObjectURL(url)
	}

	return (
		<div className="min-h-screen bg-background p-6">
			<div className="mx-auto max-w-7xl space-y-8">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div className="flex items-center gap-4">
						<div className="rounded-xl bg-primary/10 p-3">
							<Wallet className="size-8 text-primary" />
						</div>
						<div>
							<h1 className="font-bold text-3xl text-foreground">
								Controle Patrimonial
							</h1>
							<p className="text-muted-foreground">
								Gestão financeira {selectedYear}
							</p>
						</div>
					</div>
					<Button onClick={exportData} variant="default">
						<Download className="size-4" />
						Exportar CSV
					</Button>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<StatCard
						title="Patrimônio Total"
						value={formatCurrency(stats.total)}
						icon={Wallet}
						trend={`+${stats.growth.toFixed(1)}%`}
						trendUp={stats.growth > 0}
					/>
					<StatCard
						title="Total em Reservas"
						value={formatCurrency(stats.totalReservas)}
						icon={TrendingUp}
					/>
					<StatCard
						title="Total em Investimentos"
						value={formatCurrency(stats.totalFiis + stats.totalDolar)}
						icon={TrendingUp}
					/>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<FinancialChart data={chartData} />
					<CategoryBreakdown data={categoryData} />
				</div>

				<div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
					<div className="mb-6">
						<h2 className="font-semibold text-2xl">Detalhamento Mensal</h2>
						<p className="mt-1 text-muted-foreground text-sm">
							Clique no ícone de edição para alterar valores
						</p>
					</div>
					<FinancialTable data={data} onUpdateData={setData} />
				</div>
			</div>
		</div>
	)
}
