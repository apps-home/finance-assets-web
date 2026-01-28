import { apiClient } from '@/shared/services/axios-client'

interface UploadUserAvatarResponse {
	url: string
	message: string
}

interface UploadUserAvatarParams {
	id: string
	data: FormData
}

export async function uploadUserAvatar({
	id,
	data
}: UploadUserAvatarParams): Promise<UploadUserAvatarResponse> {
	const response = await apiClient.post(`/users/${id}/upload-avatar`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})

	return response.data
}
