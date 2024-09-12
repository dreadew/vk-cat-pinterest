import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

type Props = {
	name: string
	href: string
	active?: boolean
}

export const HeaderLink = ({ name, href, active = false }: Props) => {
	return (
		<Link
			className={cn(
				'px-8 h-full flex items-center text-white betterhover:hover:bg-[#1E88E5] betterhover:hover:opacity-100 transition-[colors,opacity] text-center',
				active ? 'bg-[#1E88E5]' : 'opacity-70'
			)}
			to={href}
		>
			{name}
		</Link>
	)
}
