import { Like } from './like.types'

export type User = {
	id: string
	login: string
	likes: Like[]
	createdAt: string
	updatedAt: string
}

export type UserWithoutLikes = Omit<User, 'likes'>

export type AuthDto = {
	login: string
	password: string
}

export type AuthResponse = {
	id: string
	login: string
	createdAt: string
	updatedAt: string
	accessToken: string
}
