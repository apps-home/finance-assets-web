import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

interface CategoryData {
	name: string;
	value: number;
	color: string;
}

interface CategoryBreakdownProps {
	data: CategoryData[];
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
	return (
		<div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur">
			<h3 className="mb-6 text-white text-xl">Distribuição por Categoria</h3>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={data.map((item) => ({
							name: item.name,
							value: item.value,
							color: item.color,
						}))}
						cx="50%"
						cy="50%"
						labelLine={false}
						label={({ name, percent }) =>
							`${name} ${(percent ?? 0 * 100).toFixed(0)}%`
						}
						outerRadius={100}
						fill="#8884d8"
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={entry.name} fill={entry.color} />
						))}
					</Pie>
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
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
