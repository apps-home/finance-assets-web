import { Edit, Loader2, Save, X } from 'lucide-react'
import { useState } from 'react'

import type { CreateBudgetDTO } from '@/api/budgets/types'
import type { MonthData } from '@/app/(application)/(dashboard)/page'
import { Button } from '@/components/ui/button'

interface Category {
	id: string
	name: string
}

interface FinancialTableProps {
	data: MonthData[]
	categories: Category[]
	year: number
	onSaveCell: (dto: CreateBudgetDTO) => Promise<void>
}

export function FinancialTable({
	data,
	categories,
	year,
	onSaveCell
}: FinancialTableProps) {
	const [editingCell, setEditingCell] = useState<{
		row: number
		col: string
	} | null>(null)

	const [tempValue, setTempValue] = useState('')
	const [isSaving, setIsSaving] = useState(false)

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(value)
	}

	const parseValue = (value: string): number => {
		const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.')
		return Number.parseFloat(cleaned) || 0
	}

	const handleEdit = (
		rowIndex: number,
		columnName: string,
		currentValue: number
	) => {
		setEditingCell({ row: rowIndex, col: columnName })
		setTempValue(currentValue.toFixed(2).replace('.', ','))
	}

	const handleSave = async () => {
		if (!editingCell) return

		const category = categories.find((c) => c.name === editingCell.col)

		if (!category) {
			console.error('Categoria não encontrada para a coluna:', editingCell.col)
			return
		}

		const amount = parseValue(tempValue)
		const monthIndex = editingCell.row + 1
		console.log(category)
		const dto: CreateBudgetDTO = {
			categoryId: category.id,
			month: monthIndex,
			year: year,
			amount: amount,
			exchangeRate: null
		}

		try {
			setIsSaving(true)

			await onSaveCell(dto)

			setEditingCell(null)
			setTempValue('')
		} catch (error) {
			console.error('Erro ao salvar', error)
		} finally {
			setIsSaving(false)
		}
	}

	const handleCancel = () => {
		setEditingCell(null)
		setTempValue('')
	}

	const calculateTotal = (row: MonthData) => {
		return Object.keys(row).reduce((acc, key) => {
			if (key === 'month' || key === 'monthIndex' || key === 'id') return acc
			const value = row[key]
			return acc + (typeof value === 'number' ? value : 0)
		}, 0)
	}

	const renderCell = (rowIndex: number, columnName: string, value: unknown) => {
		const numericValue = typeof value === 'number' ? value : 0
		const isEditing =
			editingCell?.row === rowIndex && editingCell?.col === columnName

		if (isEditing) {
			return (
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={tempValue}
						autoFocus
						disabled={isSaving}
						onChange={(e) => setTempValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSave()
							if (e.key === 'Escape') handleCancel()
						}}
						className="w-full rounded border border-primary bg-input px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
					/>
					<Button
						onClick={handleSave}
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-primary hover:text-primary/80"
					>
						{isSaving ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<Save className="size-4" />
						)}
					</Button>
					<Button
						onClick={handleCancel}
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-destructive hover:text-destructive/80"
					>
						<X className="size-4" />
					</Button>
				</div>
			)
		}

		return (
			<div
				className="group flex items-center justify-between"
				onClick={() => handleEdit(rowIndex, columnName, numericValue)}
			>
				<span>{formatCurrency(numericValue)}</span>
				<Button
					onClick={() => handleEdit(rowIndex, columnName, numericValue)}
					variant="ghost"
					size="icon"
					className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity hover:text-primary group-hover:opacity-100"
				>
					<Edit className="size-4" />
				</Button>
			</div>
		)
	}

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-border border-b">
						<th className="px-4 py-4 text-left text-muted-foreground">Mês</th>
						{categories.map((cat) => (
							<th
								key={cat.id}
								className="px-4 py-4 text-left font-medium text-muted-foreground"
							>
								{cat.name}
							</th>
						))}
						<th className="px-4 py-4 text-right text-primary">Total</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr
							key={row.month}
							className="border-border border-b transition-colors hover:bg-muted/50"
						>
							<td className="px-4 py-4 text-foreground">{row.month}</td>
							{categories.map((cat) => (
								<td
									key={`${row.month}-${cat.id}`}
									className="px-4 py-4 text-right text-muted-foreground"
								>
									{renderCell(index, cat.name, row[cat.name])}
								</td>
							))}
							<td className="px-4 py-4 text-right font-medium text-primary">
								{formatCurrency(calculateTotal(row))}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
