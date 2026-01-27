'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import {
	ArrowUpRightFromSquare,
	Download,
	Loader2,
	TrendingUp,
	Wallet
} from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { createBudget, listBudgets } from '@/api/budgets'
import { listCategories } from '@/api/categories'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CategoryBreakdown } from '@/features/components/CategoryBreakdown'
import { FinancialChart } from '@/features/components/FinancialChart'
import { FinancialTable } from '@/features/components/FinancialTable'
import { StatCard } from '@/features/components/StatCard'
import { queryClient } from '@/providers/queryClient'
import { MONTH_NAMES } from '@/shared/utils/month-names'

import type { MonthData } from './page'

export default function DashboardPageClient() {
	const [selectedYear, setSelectedYear] = useState('2026')

	const { data: budgetsData, isLoading: isLoadingBudgets } = useQuery({
		queryKey: ['budgets', selectedYear],
		queryFn: () => listBudgets({ year: parseInt(selectedYear, 10) })
	})

	const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
		queryKey: ['categories', selectedYear],
		queryFn: () => listCategories()
	})

	const { mutateAsync: saveBudget } = useMutation({
		mutationFn: createBudget,
		onSuccess: () => {
			toast.success('Valor atualizado!')
			queryClient.invalidateQueries({ queryKey: ['budgets', selectedYear] })
		},
		onError: () => {
			toast.error('Erro ao salvar valor.')
		}
	})

	const isLoading = isLoadingCategories || isLoadingBudgets
	const budgets = budgetsData || []
	const categories = categoriesData || []

	const dashboardData: MonthData[] = useMemo(() => {
		if (isLoading) return []

		// Inicializa estrutura vazia para os 12 meses
		const processedMonths = MONTH_NAMES.map((month, index) => {
			const row: MonthData = {
				month,
				monthIndex: index + 1
			}

			// Inicializa todas as categorias com 0 para aquele mês
			categories.forEach((cat) => {
				row[cat.name] = 0
			})

			return row
		})

		// Preenche com os valores do banco
		budgets.forEach((budget) => {
			const monthIndex = budget.month - 1 // Jan é 1 no banco, 0 no array
			if (monthIndex >= 0 && monthIndex < 12) {
				// Acha o nome da categoria baseado no ID
				const category = categories.find((c) => c.id === budget.categoryId)
				if (category) {
					// Atribui o valor à chave com o nome da categoria
					processedMonths[monthIndex][category.name] = Number(budget.amount)
				}
			}
		})

		return processedMonths
	}, [budgets, categories, isLoading])

	const stats = useMemo(() => {
		if (!dashboardData.length) return { total: 0, growth: 0, totalInvestido: 0 }

		const currentMonthData =
			dashboardData.find(
				(d) => d.month === MONTH_NAMES[new Date().getMonth()]
			) || dashboardData[dashboardData.length - 1]

		// Soma dinâmica de todas as chaves que não são 'month' ou 'monthIndex'
		const totalCurrent = Object.keys(currentMonthData).reduce((acc, key) => {
			if (key !== 'month' && key !== 'monthIndex') {
				return acc + (currentMonthData[key] as number)
			}
			return acc
		}, 0)

		// Lógica simples de crescimento (Comparando com Janeiro)
		const firstMonthData = dashboardData[0]
		const totalFirst = Object.keys(firstMonthData).reduce((acc, key) => {
			if (key !== 'month' && key !== 'monthIndex') {
				return acc + (firstMonthData[key] as number)
			}
			return acc
		}, 0)

		const growth =
			totalFirst > 0 ? ((totalCurrent - totalFirst) / totalFirst) * 100 : 0

		return {
			total: totalCurrent,
			growth,
			// Exemplo: Filtrar por tipo se sua categoria tiver um campo "type" ou pelo nome
			totalInvestido: totalCurrent // Ajuste conforme sua regra de negócio
		}
	}, [dashboardData])

	const categoryChartData = useMemo(() => {
		if (!dashboardData.length) return []

		// Pega dados do mês mais recente
		const currentData =
			dashboardData.find(
				(d) => d.month === MONTH_NAMES[new Date().getMonth()]
			) || dashboardData[dashboardData.length - 1]

		return categories
			.map((cat, index) => ({
				name: cat.name,
				value: currentData[cat.name] as number,
				// Gera cores dinâmicas ou usa um map de cores pré-definido
				color: `var(--chart-${(index % 5) + 1})`
			}))
			.filter((item) => item.value > 0)
	}, [dashboardData, categories])

	const mainChartData = useMemo(() => {
		return dashboardData.map((row) => {
			const total = Object.keys(row).reduce((acc, key) => {
				if (key !== 'month' && key !== 'monthIndex') {
					return acc + (row[key] as number)
				}
				return acc
			}, 0)

			return {
				...row,
				total
			}
		})
	}, [dashboardData])

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(value)
	}

	// const exportData = () => {
	// 	const csv = [
	// 		[
	// 			'Mês',
	// 			'Reserva (Pais)',
	// 			'Reserva (Irmãos)',
	// 			'Reserva (LCI e CDB)',
	// 			'Reserva (Renda Fixa)',
	// 			'FIIs',
	// 			'Dólar',
	// 			'Total'
	// 		],
	// 		...data.map((row) => [
	// 			row.month,
	// 			row.reservaPais,
	// 			row.reservaIrmaos,
	// 			row.reservaLciCdb,
	// 			row.reservaRendaFixa,
	// 			row.fiis,
	// 			row.dolar,
	// 			row.reservaPais +
	// 				row.reservaIrmaos +
	// 				row.reservaLciCdb +
	// 				row.reservaRendaFixa +
	// 				row.fiis +
	// 				row.dolar
	// 		])
	// 	]
	// 		.map((row) => row.join(','))
	// 		.join('\n')

	// 	const blob = new Blob([csv], { type: 'text/csv' })
	// 	const url = URL.createObjectURL(blob)
	// 	const a = document.createElement('a')
	// 	a.href = url
	// 	a.download = `patrimonio_${selectedYear}.csv`
	// 	a.click()
	// 	URL.revokeObjectURL(url)
	// }

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader2 className="size-8 animate-spin text-primary" />
			</div>
		)
	}

	return (
		<div className="bg-background px-6 pt-4 pb-12">
			<div className="mx-auto max-w-screen-2xl space-y-8">
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
					<div className="flex items-center gap-6">
						<Tabs defaultValue="2026">
							<TabsList variant="line">
								<TabsTrigger value="2026">2026</TabsTrigger>
								<TabsTrigger value="2025">2025</TabsTrigger>
								<TabsTrigger value="2024">2024</TabsTrigger>
								<TabsTrigger value="plus">+</TabsTrigger>
							</TabsList>
							<TabsContent value="2026">{/* Seu conteúdo aqui */}</TabsContent>
							<TabsContent value="2025">{/* Seu conteúdo aqui */}</TabsContent>
							<TabsContent value="2024">{/* Seu conteúdo aqui */}</TabsContent>
						</Tabs>
						<Button onClick={() => {}} variant="default">
							<Download className="size-4" />
							Exportar CSV
						</Button>
					</div>
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
						value={formatCurrency(stats.totalInvestido)}
						icon={TrendingUp}
					/>
					<StatCard
						title="Total em Investimentos"
						value={formatCurrency(stats.total + stats.growth)}
						icon={TrendingUp}
					/>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<FinancialChart data={mainChartData} />
					<CategoryBreakdown data={categoryChartData} />
				</div>

				<div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
					<div className="flex items-center justify-between">
						<div className="mb-8">
							<h2 className="font-semibold text-2xl">Detalhamento Mensal</h2>
							<p className="mt-1 text-muted-foreground text-sm">
								Clique no ícone de edição para alterar valores
							</p>
						</div>
						<Link href="/profile?tab=configuracoes">
							<Button variant="default">
								Criar Categoria
								<ArrowUpRightFromSquare className="size-4" />
							</Button>
						</Link>
					</div>
					<FinancialTable
						data={dashboardData}
						categories={categories}
						year={parseInt(selectedYear, 10)}
						onSaveCell={async (dto) => {
							await saveBudget(dto)
						}}
					/>
				</div>
			</div>
		</div>
	)
}
