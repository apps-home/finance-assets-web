'use client'

import { Edit2, PlusIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { createCategory, deleteCategory, listCategories, updateCategory } from '@/api/categories'
import { useQuery } from '@tanstack/react-query'

interface Category {
	id: string
	name: string
	currency: string
}

const CURRENCIES = [
	{ value: 'BRL', label: 'Real Brasileiro (R$)' },
	{ value: 'USD', label: 'Dólar Americano ($)' },
	{ value: 'EUR', label: 'Euro (€)' },
	{ value: 'GBP', label: 'Libra Esterlina (£)' }
]

export function CategoryManager() {
	
	const {data: categoriesData} = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const data = await listCategories()
				return data
		}	
	})

	const categories = categoriesData || []

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [editingCategory, setEditingCategory] = useState<Category | null>(null)
	const [deletingCategory, setDeletingCategory] = useState<Category | null>(
		null
	)
	const [formData, setFormData] = useState({ name: '', currency: 'BRL' })

	const handleOpenCreate = () => {
		setEditingCategory(null)
		setFormData({ name: '', currency: 'BRL' })
		setIsModalOpen(true)
	}

	const handleOpenEdit = (category: Category) => {
		setEditingCategory(category)
		setFormData({ name: category.name, currency: category.currency })
		setIsModalOpen(true)
	}

	const handleOpenDelete = (category: Category) => {
		setDeletingCategory(category)
		setIsDeleteModalOpen(true)
	}

	const handleSubmit = async () => {
		if (!formData.name.trim()) {
			toast.error('O nome da categoria é obrigatório')
			return
		}

		if (editingCategory) {
			const updatedCategory = {
				...editingCategory,
				name: formData.name,
				currency: formData.currency
			}
			await updateCategory(editingCategory.id, updatedCategory)

			toast.success('Categoria atualizada com sucesso!')
		} else {
			const newCategory = {
				name: formData.name,
				currency: formData.currency
			}

			await createCategory(newCategory)
			toast.success('Categoria criada com sucesso!')
		}

		setIsModalOpen(false)
		setFormData({ name: '', currency: 'BRL' })
		setEditingCategory(null)
	}

	const handleDelete = async () => {
		if (deletingCategory) {
			await deleteCategory(deletingCategory.id)
			toast.success('Categoria removida com sucesso!')
		}
		setIsDeleteModalOpen(false)
		setDeletingCategory(null)
	}

	const getCurrencyLabel = (value: string) => {
		return CURRENCIES.find((c) => c.value === value)?.label || value
	}

	return (
		<>
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Categorias</CardTitle>
							<CardDescription>
								Gerencie as categorias de ativos financeiros
							</CardDescription>
						</div>
						<Button onClick={handleOpenCreate}>
							<PlusIcon className="mr-2 h-4 w-4" />
							Nova Categoria
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{categories.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12 text-center">
							<p className="mb-4 text-muted-foreground">
								Nenhuma categoria cadastrada
							</p>
							<Button onClick={handleOpenCreate}>
								<PlusIcon className="mr-2 h-4 w-4" />
								Criar primeira categoria
							</Button>
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nome</TableHead>
									<TableHead>Moeda</TableHead>
									<TableHead className="w-25 text-right">Ações</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{categories.map((category) => (
									<TableRow key={category.id}>
										<TableCell className="font-medium">
											{category.name}
										</TableCell>
										<TableCell>{getCurrencyLabel(category.currency)}</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleOpenEdit(category)}
												>
													<Edit2 className="h-4 w-4" />
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleOpenDelete(category)}
												>
													<Trash2 className="h-4 w-4 text-destructive" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>
							{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
						</DialogTitle>
						<DialogDescription>
							{editingCategory
								? 'Altere as informações da categoria'
								: 'Preencha as informações para criar uma nova categoria'}
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="category-name">Nome</Label>
							<Input
								id="category-name"
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, name: e.target.value }))
								}
								placeholder="Ex: Investimentos"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="category-currency">Moeda</Label>
							<Select
								value={formData.currency}
								onValueChange={(value) => {
									if (value) {
										setFormData((prev) => ({ ...prev, currency: value }))
									}
								}}
							>
								<SelectTrigger id="category-currency">
									<SelectValue placeholder="Selecione a moeda" />
								</SelectTrigger>
								<SelectContent>
									{CURRENCIES.map((currency) => (
										<SelectItem key={currency.value} value={currency.value}>
											{currency.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<DialogFooter className="gap-2">
						<Button variant="outline" onClick={() => setIsModalOpen(false)}>
							Cancelar
						</Button>
						<Button onClick={handleSubmit}>
							{editingCategory ? 'Salvar Alterações' : 'Criar Categoria'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Confirmar Exclusão</DialogTitle>
						<DialogDescription>
							Tem certeza que deseja excluir a categoria{' '}
							<strong>{deletingCategory?.name}</strong>? Esta ação não pode ser
							desfeita.
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="gap-2">
						<Button
							variant="outline"
							onClick={() => setIsDeleteModalOpen(false)}
						>
							Cancelar
						</Button>
						<Button variant="destructive" onClick={handleDelete}>
							Excluir Categoria
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
