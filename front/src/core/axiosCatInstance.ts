import axios, { CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: 'https://api.thecatapi.com/v1/images/',
}

const apiKeyHeader = 'x-api-key'
const axiosCatInstance = axios.create(options)

axiosCatInstance.interceptors.request.use(config => {
	const apiKey = import.meta.env.VITE_API_KEY

	if (apiKey) {
		config.headers.set(apiKeyHeader, apiKey)
	}

	return config
})

export { axiosCatInstance }
