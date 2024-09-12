import { AuthForm } from './forms/auth-form'

export const AuthFormWrapper = () => {
	return (
		<div className='mx-10 max-w-[30rem] w-full flex flex-col items-center gap-5'>
			<h2 className='text-2xl font-bold text-gray-800'>Вход в аккаунт</h2>
			<AuthForm />
		</div>
	)
}
