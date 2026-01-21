import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
	title: string
	value: string
	icon: LucideIcon
	trend?: string
	trendUp?: boolean
}

export function StatCard({
	title,
	value,
	icon: Icon,
	trend,
	trendUp
}: StatCardProps) {
	return (
		<div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur transition-all duration-300 hover:border-emerald-500/30">
			<div className="mb-4 flex items-center justify-between">
				<div className="rounded-lg bg-emerald-500/10 p-3">
					<Icon className="size-6 text-emerald-400" />
				</div>
				{trend && (
					<div
						className={`text-sm ${trendUp ? 'text-emerald-400' : 'text-red-400'}`}
					>
						{trend}
					</div>
				)}
			</div>
			<div className="mb-1 text-sm text-zinc-400">{title}</div>
			<div className="text-2xl text-white">{value}</div>
		</div>
	)
}
