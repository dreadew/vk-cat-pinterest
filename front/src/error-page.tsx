import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
	const error = useRouteError()
	console.error(error)

	let errorMessage: string = ''

	if (isRouteErrorResponse(error)) {
		errorMessage = error.statusText
	} else if (error instanceof Error) {
		errorMessage = error.message
	}

	return (
		<div className='h-screen w-full flex flex-col items-center justify-center gap-2'>
			<h2 className='font-bold text-3xl text-gray-800'>Oops!</h2>
			<p className='font-medium text-sm text-gray-500'>
				Sorry, an unexpected error has occured.
			</p>
			<p className='max-w-[80%] p-2 bg-red-100 border border-red-500 rounded-md text-center'>
				<i className='text-red-700'>Error: {errorMessage}</i>
			</p>
		</div>
	)
}
