import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { LikedCatsQuery } from '../constants/queries'
import { useAuth } from '../context/auth-context'
import { cn } from '../lib/utils'
import likeService from '../services/like.service'
import { AddLikeDto, Like, RemoveLikeDto } from '../types/like.types'

type Props = {
	id: string
	url: string
	isLiked?: boolean
}

export const CatLike = ({ id, url, isLiked = false }: Props) => {
	const { isLoggedIn } = useAuth()

	const queryClient = useQueryClient()

	const { mutate: addMutation, isPending: addMutationIsPending } = useMutation({
		mutationFn: (data: AddLikeDto) => likeService.AddLike(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [LikedCatsQuery] })
		},
		onMutate: async like => {
			await queryClient.cancelQueries({ queryKey: [LikedCatsQuery] })

			const previousLikes = queryClient.getQueryData([LikedCatsQuery]) as Like[]

			queryClient.setQueryData([LikedCatsQuery], () => [
				...previousLikes,
				{
					catId: like.catId,
					url: like.url,
					createdAt: new Date().toISOString(),
				},
			])

			return { previousLikes }
		},
		onError: (error, _, context) => {
			console.error(error)
			if (context?.previousLikes) {
				queryClient.setQueryData([LikedCatsQuery], context.previousLikes)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: [LikedCatsQuery],
			})
		},
	})

	const { mutate: deleteMutation, isPending: deleteMutationIsPending } =
		useMutation({
			mutationFn: (data: RemoveLikeDto) => likeService.RemoveLike(data),
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: [LikedCatsQuery] })
			},
			onMutate: async like => {
				await queryClient.cancelQueries({ queryKey: [LikedCatsQuery] })

				const previousLikes = queryClient.getQueryData([
					LikedCatsQuery,
				]) as Like[]

				queryClient.setQueryData([LikedCatsQuery], _ =>
					previousLikes.filter(oldLike => oldLike.catId !== like.catId)
				)

				return { previousLikes }
			},
			onError: (error, _, context) => {
				console.error(error)
				if (context?.previousLikes) {
					queryClient.setQueryData([LikedCatsQuery], context.previousLikes)
				}
			},
			onSettled: () => {
				queryClient.invalidateQueries({
					queryKey: [LikedCatsQuery],
				})
			},
		})

	const handleClick = async () => {
		if (!isLoggedIn()) {
			toast('Сначала войдите в аккаунт')
			console.error('Сначала войдите в аккаунт')
			return
		}

		if (!isLiked) {
			addMutation({
				catId: id,
				url: url,
			})
			return
		}

		deleteMutation({
			catId: id,
		})
	}

	return (
		<button
			disabled={addMutationIsPending || deleteMutationIsPending}
			onClick={handleClick}
		>
			<Heart
				className={cn(
					'visible md:invisible betterhover:group-hover:visible absolute right-4 bottom-4 h-10 w-10 text-red-500 betterhover:hover:fill-red-500 transition-[visibility,colors,transform] active:scale-95 active:fill-red-500',
					isLiked && 'visible fill-red-500',
					'disabled:opacity-80'
				)}
			/>
		</button>
	)
}
