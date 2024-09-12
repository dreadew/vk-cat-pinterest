import { Header } from '../components/header'
import { PageTitle } from '../components/page-title'
import ErrorPage from '../error-page'
import AuthPage from '../routes/auth'
import LikedPage from '../routes/liked'
import RootPage from '../routes/root'
import { RouteType } from '../types/routes.types'

export const Routes: RouteType[] = [
	{
		path: '/',
		element: (
			<>
				<PageTitle title='Все котики' />
				<Header />
				<RootPage />
			</>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: '/liked',
		element: (
			<>
				<PageTitle title='Любимые котики' />
				<Header />
				<LikedPage />
			</>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: '/auth',
		element: (
			<>
				<PageTitle title='Вход в аккаунт' />
				<Header />
				<AuthPage />
			</>
		),
		errorElement: <ErrorPage />,
	},
]
