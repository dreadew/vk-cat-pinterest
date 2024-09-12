import { useIntersectionObserver } from '@siberiacancode/reactuse'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { CatList } from '../components/cat-list'
import { Container } from '../components/container'
import { Loading } from '../components/loading'
import { CatsQuery, LikedCatsQuery } from '../constants/queries'
import { useAuth } from '../context/auth-context'
import catsService from '../services/cats.service'
import likeService from '../services/like.service'

export default function RootQueryPage() {
	const { isLoggedIn } = useAuth()

	const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery({
		queryKey: [CatsQuery],
		queryFn: catsService.fetchCats,
		initialPageParam: 0,
		getNextPageParam: (_, pages) => {
			return pages.length + 1
		},
		refetchInterval: false,
		refetchOnWindowFocus: false,
	})

	const { data: likedData } = useQuery({
		queryKey: [LikedCatsQuery],
		queryFn: () => likeService.GetLikes(),
		enabled: isLoggedIn,
		refetchOnWindowFocus: false,
	})

	const { ref } = useIntersectionObserver<HTMLDivElement>({
		threshold: 1,
		onChange: entry => {
			if (entry.isIntersecting) {
				fetchNextPage()
			}
		},
	})

	return (
		<section className='min-h-screen pt-20 pb-10'>
			<Container
				className={
					isLoading || isError || !data
						? 'h-full w-full flex items-center justify-center'
						: 'px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center'
				}
			>
				{data &&
					data.pages.map((page, idx) => (
						<CatList
							key={`cat-list-${idx}`}
							cats={page.data}
							likes={likedData}
							isLoading={isLoading}
							error={isError}
						/>
					))}
				<Loading ref={ref} />
			</Container>
		</section>
	)
}
