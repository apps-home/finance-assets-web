'use client'

import { LogOut, User } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function ProfileMenu() {
	const user = {
		name: 'Usuário Exemplo',
		email: 'usuario@exemplo.com'
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
						className="relative h-9 w-9 rounded-full"
					/>
				}
			>
				<User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
				<span className="sr-only">Abrir menu de usuário</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="font-medium text-sm leading-none">{user.name}</p>
							<p className="text-muted-foreground text-xs leading-none">
								{user.email}
							</p>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="py-4">
					<Link href="/profile" className="flex w-full items-center">
						<User className="mr-2 h-4 w-4" />
						<span>Perfil</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					variant="destructive"
					className="py-4"
					onClick={() => {
						console.log('Lógica de logout aqui')
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
