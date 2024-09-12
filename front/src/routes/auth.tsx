import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthFormWrapper } from '../components/auth-form-wrapper'
import { Container } from '../components/container'
import { AuthorizedRedirectPath } from '../constants/paths'
import { useAuth } from '../context/auth-context'

export default function AuthPage() {
	const { isLoggedIn } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (isLoggedIn()) {
			navigate(AuthorizedRedirectPath)
		}
	}, [isLoggedIn])

	return (
		<section className='h-screen'>
			<Container className='h-full flex items-center justify-center'>
				<AuthFormWrapper />
			</Container>
		</section>
	)
}
