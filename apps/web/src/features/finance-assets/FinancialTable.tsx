import { Edit, Save, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MonthData {
	month: string;
	reservaPais: number;
	reservaIrmaos: number;
	reservaLciCdb: number;
	reservaRendaFixa: number;
	fiis: number;
	dolar: number;
}

interface FinancialTableProps {
	data: MonthData[];
	onUpdateData: (data: MonthData[]) => void;
}

export function FinancialTable({ data, onUpdateData }: FinancialTableProps) {
	const [editingCell, setEditingCell] = useState<{
		row: number;
		col: string;
	} | null>(null);
	const [tempValue, setTempValue] = useState("");

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	const parseValue = (value: string): number => {
		const cleaned = value.replace(/[^\d,.-]/g, "").replace(",", ".");
		return Number.parseFloat(cleaned) || 0;
	};

	const handleEdit = (
		rowIndex: number,
		column: string,
		currentValue: number,
	) => {
		setEditingCell({ row: rowIndex, col: column });
		setTempValue(currentValue.toFixed(2).replace(".", ","));
	};

	const handleSave = () => {
		if (editingCell) {
			const newData = [...data];
			const value = parseValue(tempValue);
			newData[editingCell.row] = {
				...newData[editingCell.row],
				[editingCell.col]: value,
			};
			onUpdateData(newData);
			setEditingCell(null);
			setTempValue("");
		}
	};

	const handleCancel = () => {
		setEditingCell(null);
		setTempValue("");
	};

	const calculateTotal = (row: MonthData) => {
		return (
			row.reservaPais +
			row.reservaIrmaos +
			row.reservaLciCdb +
			row.reservaRendaFixa +
			row.fiis +
			row.dolar
		);
	};

	const renderCell = (rowIndex: number, column: string, value: number) => {
		const isEditing =
			editingCell?.row === rowIndex && editingCell?.col === column;

		if (isEditing) {
			return (
				<div className="flex items-center gap-2">
					<input
						type="text"
						value={tempValue}
						onChange={(e) => setTempValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSave();
							if (e.key === "Escape") handleCancel();
						}}
						className="w-full rounded border border-emerald-500 bg-zinc-800 px-2 py-1 text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
					/>
					<Button
						onClick={handleSave}
						className="text-emerald-400 hover:text-emerald-300"
					>
						<Save className="size-4" />
					</Button>
					<Button
						onClick={handleCancel}
						className="text-red-400 hover:text-red-300"
					>
						<X className="size-4" />
					</Button>
				</div>
			);
		}

		return (
			<div className="group flex items-center justify-between">
				<span>{formatCurrency(value)}</span>
				<Button
					onClick={() => handleEdit(rowIndex, column, value)}
					className="text-zinc-500 opacity-0 transition-opacity hover:text-emerald-400 group-hover:opacity-100"
				>
					<Edit className="size-4" />
				</Button>
			</div>
		);
	};

	return (
		<div className="overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-zinc-800 border-b">
						<th className="px-4 py-4 text-left text-zinc-400">Mês</th>
						<th className="px-4 py-4 text-right text-zinc-400">
							Reserva (Pais)
						</th>
						<th className="px-4 py-4 text-right text-zinc-400">
							Reserva (Irmãos)
						</th>
						<th className="px-4 py-4 text-right text-zinc-400">
							Reserva (LCI e CDB)
						</th>
						<th className="px-4 py-4 text-right text-zinc-400">
							Reserva (Renda Fixa)
						</th>
						<th className="px-4 py-4 text-right text-zinc-400">FIIs</th>
						<th className="px-4 py-4 text-right text-zinc-400">Dólar</th>
						<th className="px-4 py-4 text-right text-emerald-400">Total</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr
							key={row.month}
							className="border-zinc-900 border-b transition-colors hover:bg-zinc-900/50"
						>
							<td className="px-4 py-4 text-zinc-300">{row.month}</td>
							<td className="px-4 py-4 text-right text-zinc-200">
								{renderCell(index, "reservaPais", row.reservaPais)}
							</td>
							<td className="px-4 py-4 text-right text-zinc-200">
								{renderCell(index, "reservaIrmaos", row.reservaIrmaos)}
							</td>
							<td className="px-4 py-4 text-right text-zinc-200">
								{renderCell(index, "reservaLciCdb", row.reservaLciCdb)}
							</td>
							<td className="px-4 py-4 text-right text-zinc-200">
								{renderCell(index, "reservaRendaFixa", row.reservaRendaFixa)}
							</td>
							<td className="px-4 py-4 text-right text-zinc-200">
								{renderCell(index, "fiis", row.fiis)}
							</td>
							<td className="px-4 py-4 text-right text-zinc-200">
								{renderCell(index, "dolar", row.dolar)}
							</td>
							<td className="px-4 py-4 text-right text-emerald-400">
								{formatCurrency(calculateTotal(row))}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
