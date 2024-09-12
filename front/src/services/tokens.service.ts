import { decodeJwt, jwtVerify } from 'jose'
import Cookies from 'js-cookie'
import { isLoggedInCookie, JwtSecret } from '../constants/constants'
import { AccessTokenCookie } from '../constants/cookies'
import { JWTType } from '../types/jwt.types'

const options: Cookies.CookieAttributes = {
	sameSite: 'strict',
	secure: import.meta.env.PROD,
}

export const getAccessToken = () => {
	return Cookies.get(AccessTokenCookie)
}

export const getIsLoggedIn = () => {
	return Cookies.get(isLoggedInCookie)
}

export const validateToken = async (token: string) => {
	try {
		await jwtVerify(token, new TextEncoder().encode(JwtSecret))
		return true
	} catch (err: unknown) {
		return false
	}
}

export const saveTokenToCookies = async (token: string) => {
	if (!JwtSecret) return

	const isValid = await validateToken(token)

	if (!isValid) return

	Cookies.set(AccessTokenCookie, token, options)
}

export const saveToCookies = (name: string, value: string) => {
	Cookies.set(name, value, options)
}

export const decodeToken = async (token: string) => {
	return (await decodeJwt(token)) as JWTType
}

export const removeToken = () => {
	Cookies.remove(AccessTokenCookie)
}
