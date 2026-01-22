import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

interface ChartData {
	month: string
	reservaPais: number
	reservaIrmaos: number
	reservaLciCdb: number
	reservaRendaFixa: number
	fiis: number
	dolar: number
	total: number
}

interface FinancialChartProps {
	data: ChartData[]
}

export function FinancialChart({ data }: FinancialChartProps) {
	return (
		<div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
			<h3 className="mb-6 font-semibold text-xl">Evolução Patrimonial</h3>
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart data={data}>
					<defs>
						<linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
							<stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
					<XAxis
						dataKey="month"
						stroke="var(--muted-foreground)"
						tick={{ fill: 'var(--muted-foreground)' }}
					/>
					<YAxis
						stroke="var(--muted-foreground)"
						tick={{ fill: 'var(--muted-foreground)' }}
						tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: 'var(--popover)',
							borderColor: 'var(--border)',
							borderRadius: 'var(--radius)',
							color: 'var(--popover-foreground)'
						}}
						formatter={(value: number | undefined) => [
							new Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL'
							}).format(value ?? 0),
							''
						]}
					/>
					<Legend wrapperStyle={{ color: 'var(--muted-foreground)' }} />
					<Area
						type="monotone"
						dataKey="total"
						stroke="var(--primary)"
						strokeWidth={2}
						fill="url(#colorTotal)"
						name="Total"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}
