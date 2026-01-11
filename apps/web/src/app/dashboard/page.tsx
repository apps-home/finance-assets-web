"use client";

import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import { CategoryBreakdown } from "../../features/finance-assets/CategoryBreakdown";
import { FinancialChart } from "../../features/finance-assets/FinancialChart";
import { FinancialTable } from "../../features/finance-assets/FinancialTable";
import { StatCard } from "../../features/finance-assets/StatCard";

interface MonthData {
	month: string;
	reservaPais: number;
	reservaIrmaos: number;
	reservaLciCdb: number;
	reservaRendaFixa: number;
	fiis: number;
	dolar: number;
}

const initialData: MonthData[] = [
	{
		month: "Janeiro",
		reservaPais: 14530.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 0.0,
		reservaRendaFixa: 0.0,
		fiis: 1200.0,
		dolar: 4930.0,
	},
	{
		month: "Fevereiro",
		reservaPais: 9111.86,
		reservaIrmaos: 0.0,
		reservaLciCdb: 3000.0,
		reservaRendaFixa: 4500.0,
		fiis: 1268.34,
		dolar: 4712.0,
	},
	{
		month: "Março",
		reservaPais: 9000.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 3030.0,
		reservaRendaFixa: 5662.0,
		fiis: 1280.0,
		dolar: 4324.0,
	},
	{
		month: "Abril",
		reservaPais: 12579.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 3060.0,
		reservaRendaFixa: 5710.0,
		fiis: 1312.0,
		dolar: 4459.0,
	},
	{
		month: "Maio",
		reservaPais: 12510.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 3097.0,
		reservaRendaFixa: 5762.0,
		fiis: 1343.0,
		dolar: 4929.0,
	},
	{
		month: "Junho",
		reservaPais: 13190.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 3132.0,
		reservaRendaFixa: 8520.0,
		fiis: 1337.0,
		dolar: 5340.0,
	},
	{
		month: "Julho",
		reservaPais: 13054.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 3175.0,
		reservaRendaFixa: 9092.0,
		fiis: 1345.0,
		dolar: 5417.0,
	},
	{
		month: "Agosto",
		reservaPais: 13216.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 3215.0,
		reservaRendaFixa: 9270.0,
		fiis: 1348.0,
		dolar: 5536.0,
	},
	{
		month: "Setembro",
		reservaPais: 10265.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 3265.0,
		reservaRendaFixa: 11600.0,
		fiis: 1340.0,
		dolar: 5784.0,
	},
	{
		month: "Outubro",
		reservaPais: 10055.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 3308.0,
		reservaRendaFixa: 10712.0,
		fiis: 1362.0,
		dolar: 5851.0,
	},
	{
		month: "Novembro",
		reservaPais: 10008.37,
		reservaIrmaos: 642.0,
		reservaLciCdb: 3342.58,
		reservaRendaFixa: 11800.0,
		fiis: 1343.38,
		dolar: 5720.52,
	},
	{
		month: "Dezembro",
		reservaPais: 0.0,
		reservaIrmaos: 0.0,
		reservaLciCdb: 0.0,
		reservaRendaFixa: 0.0,
		fiis: 0.0,
		dolar: 5723.97,
	},
];

export default function App() {
	const [data, setData] = useState<MonthData[]>(initialData);
	const [selectedYear] = useState("2024");

	const stats = useMemo(() => {
		const latestMonth = data[data.length - 2]; // Dezembro tem valores zerados, usar Novembro
		const total =
			latestMonth.reservaPais +
			latestMonth.reservaIrmaos +
			latestMonth.reservaLciCdb +
			latestMonth.reservaRendaFixa +
			latestMonth.fiis +
			latestMonth.dolar;

		const firstMonth = data[0];
		const firstTotal =
			firstMonth.reservaPais +
			firstMonth.reservaIrmaos +
			firstMonth.reservaLciCdb +
			firstMonth.reservaRendaFixa +
			firstMonth.fiis +
			firstMonth.dolar;

		const growth = ((total - firstTotal) / firstTotal) * 100;

		// Calcular total por categoria em todo o ano
		const totalReservas = data.reduce(
			(sum, month) =>
				sum +
				month.reservaPais +
				month.reservaIrmaos +
				month.reservaLciCdb +
				month.reservaRendaFixa,
			0,
		);

		const totalFiis = data.reduce((sum, month) => sum + month.fiis, 0);
		const totalDolar = data.reduce((sum, month) => sum + month.dolar, 0);

		return {
			total,
			growth,
			totalReservas,
			totalFiis,
			totalDolar,
		};
	}, [data]);

	const chartData = useMemo(() => {
		return data.map((month) => ({
			...month,
			total:
				month.reservaPais +
				month.reservaIrmaos +
				month.reservaLciCdb +
				month.reservaRendaFixa +
				month.fiis +
				month.dolar,
		}));
	}, [data]);

	const categoryData = useMemo(() => {
		const latestMonth = data[data.length - 2];
		return [
			{
				name: "Reserva (Pais)",
				value: latestMonth.reservaPais,
				color: "#10b981",
			},
			{
				name: "Reserva (Irmãos)",
				value: latestMonth.reservaIrmaos,
				color: "#3b82f6",
			},
			{
				name: "LCI e CDB",
				value: latestMonth.reservaLciCdb,
				color: "#8b5cf6",
			},
			{
				name: "Renda Fixa",
				value: latestMonth.reservaRendaFixa,
				color: "#f59e0b",
			},
			{
				name: "FIIs",
				value: latestMonth.fiis,
				color: "#ec4899",
			},
			{
				name: "Dólar",
				value: latestMonth.dolar,
				color: "#06b6d4",
			},
		].filter((item) => item.value > 0);
	}, [data]);

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(value);
	};

	const exportData = () => {
		const csv = [
			[
				"Mês",
				"Reserva (Pais)",
				"Reserva (Irmãos)",
				"Reserva (LCI e CDB)",
				"Reserva (Renda Fixa)",
				"FIIs",
				"Dólar",
				"Total",
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
					row.dolar,
			]),
		]
			.map((row) => row.join(","))
			.join("\n");

		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `patrimonio_${selectedYear}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
			{/* Header */}
			<div className="border-zinc-800 border-b bg-zinc-900/50 backdrop-blur">
				<div className="mx-auto max-w-7xl px-6 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="rounded-xl bg-emerald-500/10 p-3">
								<Wallet className="size-8 text-emerald-400" />
							</div>
							<div>
								<h1 className="text-3xl text-white">Controle Patrimonial</h1>
								<p className="text-zinc-400">
									Gestão financeira {selectedYear}
								</p>
							</div>
						</div>
						<Button
							onClick={exportData}
							className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-400 transition-all hover:bg-emerald-500/20"
						>
							<Download className="size-4" />
							Exportar CSV
						</Button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="mx-auto max-w-7xl px-6 py-8">
				{/* Stats Cards */}
				<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
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

				{/* Charts */}
				<div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
					<FinancialChart data={chartData} />
					<CategoryBreakdown data={categoryData} />
				</div>

				{/* Table */}
				<div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur">
					<div className="mb-6">
						<h2 className="text-2xl text-white">Detalhamento Mensal</h2>
						<p className="mt-1 text-zinc-400">
							Clique no ícone de edição para alterar valores
						</p>
					</div>
					<FinancialTable data={data} onUpdateData={setData} />
				</div>
			</div>
		</div>
	);
}
