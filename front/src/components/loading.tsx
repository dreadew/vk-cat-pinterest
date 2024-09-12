import { Loader } from 'lucide-react'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Loading = React.forwardRef<HTMLDivElement, Props>(({}, ref) => {
	return (
		<div
			className='text-xl font-bold text-gray-800 flex items-center gap-2'
			ref={ref}
		>
			<Loader className='h-8 w-8 text-gray-800 animate-spin' />
			Загрузка...
		</div>
	)
})
