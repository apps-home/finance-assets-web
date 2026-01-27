export interface Category {
	id: string
	name: string
	currency: string
	userId: string
	createdAt: string
	updatedAt: string
}

export interface CreateCategoryDTO {
	name: string
	currency: string
}

export interface UpdateCategoryDTO {
	name?: string
	currency?: string
}

export interface ListCategoriesParams {
	userId?: string
}
