import { useLocation } from 'react-router-dom'
import { AuthLinks, HeaderLinks } from '../constants/links'
import { useAuth } from '../context/auth-context'
import { HeaderList } from './header-list'
import { LogoutButton } from './logout-button'

export const Header = () => {
	const { isLoggedIn } = useAuth()
	const { pathname } = useLocation()

	return (
		<header className='fixed top-0 h-16 w-full z-30 bg-[#2196F3] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.24)]'>
			<nav className='flex h-full items-center justify-between px-10 shadow-sm max-w-[90rem] mx-auto'>
				<HeaderList links={HeaderLinks} pathname={pathname} />
				{isLoggedIn() ? (
					<LogoutButton />
				) : (
					<HeaderList links={AuthLinks} pathname={pathname} />
				)}
			</nav>
		</header>
	)
}
