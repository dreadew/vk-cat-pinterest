import { cn } from '../../lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const ErrorText = ({ children, className }: Props) => {
	return (
		<span
			className={cn(
				'text-red-400 mt-1 text-xs font-medium flex items-center gap-2 whitespace-nowrap',
				className
			)}
		>
			{children}
		</span>
	)
}
