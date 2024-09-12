import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { useAuth } from '../../context/auth-context'
import userService from '../../services/user.service'
import { AuthDto } from '../../types/user.types'
import { Input, PasswordInput } from '../ui/input'

const formSchema = z.object({
	login: z
		.string()
		.min(4, {
			message: 'Длина логина должна быть больше 3 символов',
		})
		.max(16, {
			message: 'Длина логина может быть максимум 16 символов',
		}),
	password: z
		.string()
		.min(8, {
			message: 'Длина пароля должна быть больше 7 символов',
		})
		.max(16, {
			message: 'Длина пароля может быть максимум 16 символов',
		}),
})

export function AuthForm() {
	const { login } = useAuth()
	const navigate = useNavigate()

	const { mutate, isPending } = useMutation({
		mutationFn: (data: AuthDto) => userService.Auth(data),
		onSuccess: async res => {
			await login(res.data)
			toast('Вы успешно вошли в аккаунт')
			navigate('/')
		},
		onError: error => {
			console.error(error.message)
			toast(error.message)
		},
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			login: '',
			password: '',
		},
	})

	async function onSubmit(data: z.infer<typeof formSchema>) {
		mutate(data)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='max-w-[30rem] w-full flex flex-col gap-3'
		>
			<Input
				autoFocus
				disabled={isPending}
				label='Логин'
				error={errors?.login?.message}
				{...register('login')}
			/>
			<PasswordInput
				disabled={isPending}
				label='Пароль'
				error={errors?.password?.message}
				type='password'
				{...register('password')}
			/>
			<button
				disabled={isPending}
				className='mt-2 p-2 rounded-md text-white bg-[#2196F3] betterhover:hover:bg-[#1E88E5] transition-[colors,transform] active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed'
			>
				Войти в аккаунт
			</button>
		</form>
	)
}
