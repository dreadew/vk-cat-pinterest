export const CatEmpty = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-2'>
			<h3 className='font-bold text-3xl'>Ошибка!</h3>
			<p className='p-2 rounded-md bg-red-100 border-red-500 text-red-700'>
				<i>Коты не найдены</i>
			</p>
		</div>
	)
}
