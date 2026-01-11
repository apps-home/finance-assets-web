import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface ChartData {
	month: string;
	reservaPais: number;
	reservaIrmaos: number;
	reservaLciCdb: number;
	reservaRendaFixa: number;
	fiis: number;
	dolar: number;
	total: number;
}

interface FinancialChartProps {
	data: ChartData[];
}

export function FinancialChart({ data }: FinancialChartProps) {
	return (
		<div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur">
			<h3 className="mb-6 text-white text-xl">Evolução Patrimonial</h3>
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart data={data}>
					<defs>
						<linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
							<stop offset="95%" stopColor="#10b981" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
					<XAxis dataKey="month" stroke="#71717a" tick={{ fill: "#a1a1aa" }} />
					<YAxis
						stroke="#71717a"
						tick={{ fill: "#a1a1aa" }}
						tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "#18181b",
							border: "1px solid #27272a",
							borderRadius: "8px",
							color: "#fff",
						}}
						formatter={(value: number | undefined) => [
							new Intl.NumberFormat("pt-BR", {
								style: "currency",
								currency: "BRL",
							}).format(value ?? 0),
							"",
						]}
					/>
					<Legend wrapperStyle={{ color: "#a1a1aa" }} />
					<Area
						type="monotone"
						dataKey="total"
						stroke="#10b981"
						strokeWidth={2}
						fill="url(#colorTotal)"
						name="Total"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
