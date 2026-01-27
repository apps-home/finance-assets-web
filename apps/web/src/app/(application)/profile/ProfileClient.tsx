'use client'

import type { User } from 'better-auth'
import { Calendar, Camera, Mail, Settings, Shield, User2 } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CategoryManager } from '@/features/categories/CategoryManager'
import { UploadAvatarModal } from '@/features/users/UploadAvatarModal'

interface ProfileClientProps {
	user: User
	defaultTab?: string
}

export default function ProfileClient({
	user,
	defaultTab = 'perfil'
}: ProfileClientProps) {
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

	return (
		<div className="min-h-screen bg-background p-4 sm:p-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<h1 className="mb-2 font-bold text-3xl text-foreground">
						Minha Conta
					</h1>
					<p className="text-muted-foreground">
						Gerencie suas informações e configurações
					</p>
				</div>

				<Tabs defaultValue={defaultTab} className="space-y-6">
					<TabsList variant="line" className="w-full justify-start gap-4">
						<TabsTrigger value="perfil" className="gap-2">
							<User2 className="h-4 w-4" />
							Perfil
						</TabsTrigger>
						<TabsTrigger value="configuracoes" className="gap-2">
							<Settings className="h-4 w-4" />
							Configurações
						</TabsTrigger>
					</TabsList>

					<TabsContent value="perfil" className="space-y-6">
						<div className="grid gap-6 lg:grid-cols-3">
							<Card className="lg:col-span-1">
								<CardHeader className="text-center">
									<CardTitle>Foto do Perfil</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-col items-center space-y-4">
									<div className="relative">
										<Avatar className="h-32 w-32 border-4 border-border shadow-lg">
											<AvatarImage
												src={
													`${process.env.NEXT_PUBLIC_AVATAR_URL}${user?.image || ''}` ||
													''
												}
											/>
											<AvatarFallback className="bg-primary/20 font-bold text-3xl text-primary">
												{user?.name?.[0]?.toUpperCase()}
											</AvatarFallback>
										</Avatar>
										<Button
											size="sm"
											className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
											onClick={() => setIsUploadModalOpen(true)}
										>
											<Camera className="h-4 w-4" />
										</Button>
									</div>
									<Button
										variant="outline"
										onClick={() => setIsUploadModalOpen(true)}
									>
										Alterar Foto
									</Button>
								</CardContent>
							</Card>

							<Card className="lg:col-span-2">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<User2 className="h-5 w-5 text-primary" />
										Informações Pessoais
									</CardTitle>
									<CardDescription>
										Atualize suas informações pessoais
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="grid gap-4 sm:grid-cols-2">
										<div className="space-y-2">
											<Label htmlFor="name" className="flex items-center gap-2">
												<User2 className="h-4 w-4 text-muted-foreground" />
												Nome
											</Label>
											<Input id="name" defaultValue={user?.name || ''} />
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="email"
												className="flex items-center gap-2"
											>
												<Mail className="h-4 w-4 text-muted-foreground" />
												Email
											</Label>
											<Input
												id="email"
												type="email"
												disabled
												defaultValue={user?.email || ''}
											/>
										</div>
									</div>
									<div className="grid gap-4 sm:grid-cols-2">
										<div className="space-y-2">
											<Label htmlFor="phone">Telefone</Label>
											<Input
												id="phone"
												type="tel"
												disabled
												placeholder="(11) 99999-9999"
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="birthdate"
												className="flex items-center gap-2"
											>
												<Calendar className="h-4 w-4 text-muted-foreground" />
												Data de Nascimento
											</Label>
											<Input id="birthdate" type="date" disabled />
										</div>
									</div>
									<div className="pt-4">
										<Button>Salvar Alterações</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-5 w-5 text-primary" />
									Segurança
								</CardTitle>
								<CardDescription>
									Gerencie a segurança da sua conta
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form className="space-y-4">
									<div className="grid gap-4 sm:grid-cols-2">
										<div className="space-y-2">
											<Label htmlFor="current-password">Senha Atual</Label>
											<Input
												id="current-password"
												autoComplete="current-password"
												type="password"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="new-password">Nova Senha</Label>
											<Input
												id="new-password"
												autoComplete="new-password"
												type="password"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="confirm-password">
											Confirmar Nova Senha
										</Label>
										<Input
											id="confirm-password"
											autoComplete="new-password"
											type="password"
										/>
									</div>
									<Button variant="outline">Alterar Senha</Button>
								</form>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="configuracoes" className="space-y-6">
						<CategoryManager />
					</TabsContent>
				</Tabs>
			</div>

			<UploadAvatarModal
				open={isUploadModalOpen}
				onOpenChange={setIsUploadModalOpen}
				userId={user?.id || ''}
			/>
		</div>
	)
}
