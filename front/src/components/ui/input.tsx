import { Eye, EyeOff } from 'lucide-react'
import React from 'react'
import { cn } from '../../lib/utils'
import { ErrorText } from '../typography/error'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	labelClassName?: string
	label?: string
	wrapperClassName?: string
	error?: string
	state?: boolean
	setState?: (state: boolean) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			labelClassName,
			label,
			wrapperClassName,
			error,
			state = true,
			setState,
			...props
		},
		ref
	) => {
		const id = React.useId()
		return (
			<div className={cn('w-full flex flex-col gap-2', wrapperClassName)}>
				{label && (
					<label
						className={cn(
							'text-xs font-medium text-gray-500',
							labelClassName,
							error && 'text-red-400'
						)}
						htmlFor={id}
					>
						{label}
					</label>
				)}
				<div className='relative'>
					<input
						id={id}
						className={cn(
							'bg-background flex w-full rounded-md border border-gray-300 px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium font-medium text-gray-900 placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-80 ring-none outline-none transition-shadow duration-300 focus-visible:ring-[#1E88E5] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white',
							error && 'ring-offset-1 ring-offset-white ring-2 ring-red-400',
							className
						)}
						type={type === 'password' ? (state ? 'text' : 'password') : type}
						{...props}
						ref={ref}
					/>
					{type === 'password' && setState && typeof state !== 'undefined' && (
						<button
							className={cn(
								'absolute right-0 top-1/2 -translate-y-1/2 h-full rounded-r-lg px-4 border border-gray-300 bg-white betterhover:hover:bg-gray-100/50 transition-colors'
							)}
							onClick={() => setState(!state)}
							type='button'
						>
							{state ? (
								<EyeOff className='h-5 w-5 text-gray-500' />
							) : (
								<Eye className='h-5 w-5 text-gray-500' />
							)}
						</button>
					)}
				</div>
				{error && <ErrorText>{error}</ErrorText>}
			</div>
		)
	}
)

Input.displayName = 'Input'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ ...props }, ref) => {
		const [show, setShow] = React.useState<boolean>(false)
		return (
			<Input
				state={show}
				setState={setShow}
				type='password'
				ref={ref}
				{...props}
			/>
		)
	}
)

PasswordInput.displayName = 'PasswordInput'

export { Input, PasswordInput }
