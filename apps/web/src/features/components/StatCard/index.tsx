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
		<div className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/30">
			<div className="mb-4 flex items-center justify-between">
				<div className="rounded-lg bg-primary/10 p-3">
					<Icon className="size-6 text-primary" />
				</div>
				{trend && (
					<div
						className={`text-sm ${trendUp ? 'text-primary' : 'text-destructive'}`}
					>
						{trend}
					</div>
				)}
			</div>
			<div className="mb-1 text-muted-foreground text-sm">{title}</div>
			<div className="font-bold text-2xl">{value}</div>
		</div>
	)
}
