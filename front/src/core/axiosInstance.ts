import axios, { CreateAxiosDefaults } from 'axios'
import {
	getAccessToken,
	removeToken,
	validateToken,
} from '../services/tokens.service'

const options: CreateAxiosDefaults = {
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
}

const axiosInstance = axios.create(options)

axiosInstance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosInstance.interceptors.response.use(
	config => config,
	async error => {
		const config = error?.config

		if (error?.response?.status === 401 && !config.sent) {
			config.sent = true

			const token = getAccessToken()
			const tokenIsValid = await validateToken(token!)

			if (!tokenIsValid) {
				removeToken()
				window.location.href = '/'
			}

			return
		}
		return Promise.reject(error)
	}
)

export { axiosInstance }
