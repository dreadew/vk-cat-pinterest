import { axiosInstance } from '../core/axiosInstance'
import { AuthDto, AuthResponse } from '../types/user.types'

class UserService {
	private URL = '/api/user'

	async Auth(data: AuthDto) {
		return axiosInstance.post<AuthResponse>(this.URL, data)
	}
}

export default new UserService()
