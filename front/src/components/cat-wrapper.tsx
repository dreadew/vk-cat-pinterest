import { Cat } from '../types/cat.types'
import { CatLike } from './cat-like'

type Props = {
	cat: Cat
	isLiked?: boolean
}

export const CatWrapper = ({ cat, isLiked = false }: Props) => {
	return (
		<div className='group min-h-56 h-full w-full object-cover relative transition-shadow betterhover:hover:shadow-[0px_9px_9px_0px_rgba(0,0,0,0.24)]'>
			<img
				src={cat.url}
				className='h-full w-full object-cover'
				alt={`cat-image-${cat.id}`}
				loading='lazy'
			/>
			<CatLike id={cat.id} url={cat.url} isLiked={isLiked} />
		</div>
	)
}
