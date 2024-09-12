import { axiosInstance } from '../core/axiosInstance'
import { AddLikeDto, Like, RemoveLikeDto } from '../types/like.types'

class LikeService {
	private URL = '/api/likes'

	async GetLikes() {
		return (await axiosInstance.get<Like[]>(this.URL)).data
	}

	async AddLike(data: AddLikeDto) {
		return await axiosInstance.post<Like>(this.URL, data)
	}

	async RemoveLike(data: RemoveLikeDto) {
		return await axiosInstance.delete<Like>(this.URL + '/' + data.catId)
	}
}

export default new LikeService()
