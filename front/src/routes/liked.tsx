import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CatList } from '../components/cat-list'
import { Container } from '../components/container'
import { Loading } from '../components/loading'
import { AuthPath } from '../constants/paths'
import { LikedCatsQuery } from '../constants/queries'
import { useAuth } from '../context/auth-context'
import likeService from '../services/like.service'
import { Cat } from '../types/cat.types'

export default function LikedPage() {
	const { isLoggedIn } = useAuth()
	const navigate = useNavigate()
	const [catsData, setCatsData] = useState<Cat[]>([])

	useEffect(() => {
		if (!isLoggedIn()) {
			navigate(AuthPath)
		}
	}, [isLoggedIn])

	const { data, isLoading, isError } = useQuery({
		queryKey: [LikedCatsQuery],
		queryFn: () => likeService.GetLikes(),
	})

	useEffect(() => {
		if (data) {
			setCatsData([])
			data.map(cat => {
				setCatsData(prev => [
					...prev,
					{
						id: cat.catId,
						url: cat.url,
					},
				])
			})
		}
	}, [data])

	return (
		<section className='min-h-screen pt-20 pb-10'>
			<Container
				className={
					isLoading || isError || !data
						? 'h-full w-full flex items-center justify-center'
						: 'px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 place-items-center'
				}
			>
				{data && (
					<CatList
						cats={catsData}
						error={isError}
						isLoading={isLoading}
						asLiked
					/>
				)}
				{isLoading && <Loading />}
			</Container>
		</section>
	)
}
