import { Edit, Save, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

interface MonthData {
	month: string
	reservaPais: number
	reservaIrmaos: number
	reservaLciCdb: number
	reservaRendaFixa: number
	fiis: number
	dolar: number
}

interface FinancialTableProps {
	data: MonthData[]
	onUpdateData: (data: MonthData[]) => void
}

export function FinancialTable({ data, onUpdateData }: FinancialTableProps) {
	const [editingCell, setEditingCell] = useState<{
		row: number
		col: string
	} | null>(null)
	const [tempValue, setTempValue] = useState('')

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
		column: string,
		currentValue: number
	) => {
		setEditingCell({ row: rowIndex, col: column })
		setTempValue(currentValue.toFixed(2).replace('.', ','))
	}

	const handleSave = () => {
		if (editingCell) {
			const newData = [...data]
			const value = parseValue(tempValue)
			newData[editingCell.row] = {
				...newData[editingCell.row],
				[editingCell.col]: value
			}
			onUpdateData(newData)
			setEditingCell(null)
			setTempValue('')
		}
	}

	const handleCancel = () => {
		setEditingCell(null)
		setTempValue('')
	}

	const calculateTotal = (row: MonthData) => {
		return (
			row.reservaPais +
			row.reservaIrmaos +
			row.reservaLciCdb +
			row.reservaRendaFixa +
			row.fiis +
			row.dolar
		)
	}

	const renderCell = (rowIndex: number, column: string, value: number) => {
		const isEditing =
			editingCell?.row === rowIndex && editingCell?.col === column

		if (isEditing) {
			return (
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={tempValue}
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
						<Save className="size-4" />
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
			<div className="group flex items-center justify-between">
				<span>{formatCurrency(value)}</span>
				<Button
					onClick={() => handleEdit(rowIndex, column, value)}
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
						<th className="px-4 py-4 text-right text-muted-foreground">
							Reserva (Pais)
						</th>
						<th className="px-4 py-4 text-right text-muted-foreground">
							Reserva (Irmãos)
						</th>
						<th className="px-4 py-4 text-right text-muted-foreground">
							Reserva (LCI e CDB)
						</th>
						<th className="px-4 py-4 text-right text-muted-foreground">
							Reserva (Renda Fixa)
						</th>
						<th className="px-4 py-4 text-right text-muted-foreground">FIIs</th>
						<th className="px-4 py-4 text-right text-muted-foreground">
							Dólar
						</th>
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
							<td className="px-4 py-4 text-right text-muted-foreground">
								{renderCell(index, 'reservaPais', row.reservaPais)}
							</td>
							<td className="px-4 py-4 text-right text-muted-foreground">
								{renderCell(index, 'reservaIrmaos', row.reservaIrmaos)}
							</td>
							<td className="px-4 py-4 text-right text-muted-foreground">
								{renderCell(index, 'reservaLciCdb', row.reservaLciCdb)}
							</td>
							<td className="px-4 py-4 text-right text-muted-foreground">
								{renderCell(index, 'reservaRendaFixa', row.reservaRendaFixa)}
							</td>
							<td className="px-4 py-4 text-right text-muted-foreground">
								{renderCell(index, 'fiis', row.fiis)}
							</td>
							<td className="px-4 py-4 text-right text-muted-foreground">
								{renderCell(index, 'dolar', row.dolar)}
							</td>
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
