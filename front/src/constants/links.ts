import { HeaderLinkType } from '../types/links.types'
import { AuthPath } from './paths'

export const HeaderLinks: HeaderLinkType[] = [
	{
		name: 'Все котики',
		href: '/',
	},
	{
		name: 'Любимые котики',
		href: '/liked',
	},
]

export const AuthLinks: HeaderLinkType[] = [
	{
		name: 'Войти в аккаунт',
		href: AuthPath,
	},
]
