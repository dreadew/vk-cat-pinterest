import React, { createContext, useEffect, useState } from 'react'
import {
	isLoggedInCookie,
	loggedInState,
	logoutState,
	UserLocalStorageName,
} from '../constants/constants'
import {
	getAccessToken,
	getIsLoggedIn,
	removeToken,
	saveToCookies,
	saveTokenToCookies,
} from '../services/tokens.service'
import { AuthResponse, UserWithoutLikes } from '../types/user.types'

type AuthContextType = {
	user: UserWithoutLikes | null
	login: (data: AuthResponse) => Promise<void>
	logout: () => void
	isLoggedIn: () => boolean
}

type Props = {
	children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<UserWithoutLikes | null>(null)

	useEffect(() => {
		const token = getAccessToken()
		const user = localStorage.getItem(UserLocalStorageName)

		if (user && token) {
			setUser(JSON.parse(user))
		}

		if (!user || !token) {
			logout()
		}
	}, [])

	const login = async (data: AuthResponse) => {
		localStorage.setItem(
			UserLocalStorageName,
			JSON.stringify({
				id: data.id,
				login: data.login,
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
			})
		)
		saveTokenToCookies(data.accessToken)
		saveToCookies(isLoggedInCookie, loggedInState)
	}

	const logout = () => {
		localStorage.removeItem(UserLocalStorageName)
		removeToken()
		saveToCookies(isLoggedInCookie, logoutState)
	}

	const isLoggedIn = () => {
		return getIsLoggedIn() === loggedInState
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => React.useContext(AuthContext)
