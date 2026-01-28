import type { User } from 'better-auth'

import { apiClient } from '@/shared/services/axios-client'

export async function updateUser(
	id: string,
	data: Partial<User>
): Promise<User> {
	const response = await apiClient.patch(`/users/${id}/password`, data)

	return response.data
}
