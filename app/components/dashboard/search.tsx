function Search({ handleOnFilterChange }: { handleOnFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
	return (
		<div className='flex justify-end pr-10 -mt-14 '>
			<input
				className='text-sm min-w-60 bgcolor-white color-black px-3 py-2 rounded-lg outline-none placeholder-[rgba(var(--black),0.7)]'
				type='text'
				id='search'
				placeholder='Filter by URL, Alias or Description'
				onChange={handleOnFilterChange}
			/>
		</div>
	)
}

export default Search
