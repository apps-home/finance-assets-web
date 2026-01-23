// src/components/ProfileMenu.tsx
'use client'

import { LogOut, Settings, User } from 'lucide-react'
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
	// Dados de usuário simulados.
	// Numa aplicação real, isso viria do seu contexto de autenticação ou hook.
	const user = {
		name: 'Usuário Exemplo',
		email: 'usuario@exemplo.com'
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="relative h-9 w-9 rounded-full"
				>
					<User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
					<span className="sr-only">Abrir menu de usuário</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="font-medium text-sm leading-none">{user.name}</p>
						<p className="text-muted-foreground text-xs leading-none">
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild cursor-pointer>
						<Link href="/perfil" className="flex w-full items-center">
							<User className="mr-2 h-4 w-4" />
							<span>Perfil</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild cursor-pointer>
						<Link href="/configuracoes" className="flex w-full items-center">
							<Settings className="mr-2 h-4 w-4" />
							<span>Configurações</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				{/*
          O estilo 'text-destructive' e os estados de focus garantem que
          o botão de sair use as cores vermelhas definidas no seu globals.css
        */}
				<DropdownMenuItem
					className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
					onClick={() => {
						console.log('Lógica de logout aqui')
						// Ex: signOut()
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
