import { HeaderLinkType } from '../types/links.types'
import { HeaderLink } from './header-link'

type Props = {
	links: HeaderLinkType[]
	pathname: string
}

export const HeaderList = ({ links, pathname }: Props) => {
	return (
		<ul className='h-full flex items-center'>
			{links.map(link => (
				<li className='h-full flex items-center list-none' key={link.name}>
					<HeaderLink
						name={link.name}
						href={link.href}
						active={link.href === pathname}
					/>
				</li>
			))}
		</ul>
	)
}
