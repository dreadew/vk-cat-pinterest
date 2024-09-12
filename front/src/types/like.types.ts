export type Like = {
	catId: string
	url: string
	createdAt: string
}

export type AddLikeDto = {
	catId: string
	url: string
}

export type RemoveLikeDto = {
	catId: string
}
