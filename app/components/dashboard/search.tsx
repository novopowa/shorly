function Search({ handleOnFilterChange }: { handleOnFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
	return (
		<div className='flex pl-4  sm:justify-end pr-10 -mt-14'>
			<input
				className='text-sm min-w-52 w-full sm:w-auto bgcolor-black color-white border-b border-[rgb(var(--white))] py-2 outline-none placeholder-[rgba(var(--white),0.7)]'
				type='text'
				id='search'
				placeholder='Filter by URL, Alias or Description'
				onChange={handleOnFilterChange}
				autoCorrect='false'
			/>
		</div>
	)
}

export default Search
