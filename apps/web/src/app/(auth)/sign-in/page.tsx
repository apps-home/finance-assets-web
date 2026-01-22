'use client'

import { useMutation } from '@tanstack/react-query'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/navigation'
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

interface SignInBody {
	email: string
	password: string
	rememberMe?: boolean
	callbackURL?: string
}

async function signIn(body: SignInBody) {
	const response = await fetch('/api/sign-in', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || 'Erro ao fazer login')
	}

	return response.json()
}

export default function SignInPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rememberMe, setRememberMe] = useState(false)

	const mutation = useMutation({
		mutationFn: signIn,
		onSuccess: () => {
			toast.success('Login realizado com sucesso!')
			router.push('/')
		},
		onError: (error: Error) => {
			toast.error(error.message || 'Erro ao fazer login')
		}
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!email || !password) {
			toast.error('Preencha todos os campos')
			return
		}

		mutation.mutate({
			email,
			password,
			rememberMe
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
						<CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
						<CardDescription className="mt-1">
							Entre com suas credenciais para acessar sua conta
						</CardDescription>
					</div>
				</CardHeader>

				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
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
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Senha</Label>
								<a
									href="/forgot-password"
									className="text-muted-foreground text-xs hover:text-primary hover:underline"
								>
									Esqueceu a senha?
								</a>
							</div>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={mutation.isPending}
							/>
						</div>

						<div className="flex items-center gap-2">
							<Checkbox
								id="remember"
								checked={rememberMe}
								onCheckedChange={(checked) => setRememberMe(checked === true)}
								disabled={mutation.isPending}
							/>
							<Label htmlFor="remember" className="cursor-pointer">
								Lembrar de mim
							</Label>
						</div>
					</CardContent>

					<CardFooter className="flex flex-col gap-4">
						<Button
							type="submit"
							className="w-full"
							disabled={mutation.isPending}
						>
							{mutation.isPending ? 'Entrando...' : 'Entrar'}
						</Button>

						<p className="text-center text-muted-foreground text-xs">
							Não tem uma conta?{' '}
							<a href="/sign-up" className="text-primary hover:underline">
								Criar conta
							</a>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
