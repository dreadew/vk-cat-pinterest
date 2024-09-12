import { Cat } from '../types/cat.types'
import { Like } from '../types/like.types'
import { CatEmpty } from './cat-empty'
import { CatWrapper } from './cat-wrapper'

type Props = {
	cats: Cat[]
	likes?: Like[]
	error?: boolean
	isLoading?: boolean
	asLiked?: boolean
}

export const CatList = ({
	cats,
	likes = [],
	error = false,
	isLoading = true,
	asLiked = false,
}: Props) => {
	if (error) {
		return <CatEmpty />
	}

	if (cats.length === 0 && !isLoading) {
		return <CatEmpty />
	}

	return cats.map(cat => (
		<CatWrapper
			key={cat.id}
			cat={cat}
			isLiked={
				asLiked
					? asLiked
					: likes.filter(like => like.catId === cat.id).length > 0
					? true
					: false
			}
		/>
	))
}
