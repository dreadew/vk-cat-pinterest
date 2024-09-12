import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Routes } from './constants/route'
import { AuthProvider } from './context/auth-context'

const router = createBrowserRouter(Routes)

export default function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	)
}
