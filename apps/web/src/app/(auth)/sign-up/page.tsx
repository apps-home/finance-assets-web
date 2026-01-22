'use client'

import { useMutation } from '@tanstack/react-query'
import { Wallet } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SignUpBody {
	name: string
	email: string
	password: string
}

async function signUp(body: SignUpBody) {
	const response = await fetch('/api/sign-up', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || 'Erro ao criar conta')
	}

	return response.json()
}

export default function SignUpPage() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [acceptTerms, setAcceptTerms] = useState(false)

	const mutation = useMutation({
		mutationFn: signUp,
		onSuccess: () => {
			toast.success('Conta criada com sucesso!')
			window.location.href = '/sign-in'
		},
		onError: (error: Error) => {
			toast.error(error.message || 'Erro ao criar conta')
		}
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!name || !email || !password || !confirmPassword) {
			toast.error('Preencha todos os campos')
			return
		}

		if (password !== confirmPassword) {
			toast.error('As senhas não coincidem')
			return
		}

		if (password.length < 8) {
			toast.error('A senha deve ter pelo menos 8 caracteres')
			return
		}

		if (!acceptTerms) {
			toast.error('Você deve aceitar os termos de uso')
			return
		}

		mutation.mutate({
			name,
			email,
			password
		})
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-4 text-center">
					<div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10">
						<Wallet className="size-6 text-primary" />
					</div>
					<div>
						<CardTitle className="text-xl">Criar conta</CardTitle>
						<CardDescription className="mt-1">
							Preencha os dados abaixo para criar sua conta
						</CardDescription>
					</div>
				</CardHeader>

				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Nome completo</Label>
							<Input
								id="name"
								type="text"
								placeholder="Seu nome"
								value={name}
								onChange={(e) => setName(e.target.value)}
								disabled={mutation.isPending}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">E-mail</Label>
							<Input
								id="email"
								type="email"
								placeholder="seu@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={mutation.isPending}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Senha</Label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={mutation.isPending}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirmar senha</Label>
							<Input
								id="confirmPassword"
								type="password"
								placeholder="••••••••"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								disabled={mutation.isPending}
							/>
						</div>

						<div className="flex items-center gap-2">
							<Checkbox
								id="terms"
								checked={acceptTerms}
								onCheckedChange={(checked) => setAcceptTerms(checked === true)}
								disabled={mutation.isPending}
							/>
							<Label htmlFor="terms" className="cursor-pointer">
								Aceito os{' '}
								<a href="/terms" className="text-primary hover:underline">
									termos de uso
								</a>{' '}
								e{' '}
								<a href="/privacy" className="text-primary hover:underline">
									política de privacidade
								</a>
							</Label>
						</div>
					</CardContent>

					<CardFooter className="flex flex-col gap-4">
						<Button
							type="submit"
							className="w-full"
							disabled={mutation.isPending}
						>
							{mutation.isPending ? 'Criando conta...' : 'Criar conta'}
						</Button>

						<p className="text-center text-muted-foreground text-xs">
							Já tem uma conta?{' '}
							<a href="/sign-in" className="text-primary hover:underline">
								Fazer login
							</a>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
