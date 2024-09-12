import { LimitCats } from '../constants/constants'
import { axiosCatInstance } from '../core/axiosCatInstance'
import { Cat } from '../types/cat.types'

class CatsService {
	async fetchCats({ pageParam }: { pageParam: number }) {
		return await axiosCatInstance.get<Cat[]>(
			`/search?limit=${LimitCats}&page=${pageParam}`
		)
	}
}

export default new CatsService()
