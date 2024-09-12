import { useNavigate } from 'react-router-dom'
import { AuthPath } from '../constants/paths'
import { useAuth } from '../context/auth-context'
import { cn } from '../lib/utils'

export const LogoutButton = () => {
	const { logout } = useAuth()
	const navigate = useNavigate()

	return (
		<button
			className={cn(
				'px-8 h-full flex items-center text-white betterhover:hover:bg-[#1E88E5] betterhover:hover:opacity-100 transition-[colors,opacity] text-center opacity-80'
			)}
			onClick={() => {
				logout()
				navigate(AuthPath)
			}}
		>
			Выйти
		</button>
	)
}
