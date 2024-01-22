import { type LINK } from '../types/links'

export default function LinkItem({ link }: { link: LINK }) {
	return (
		<div className='w-full mx-auto color-black'>
			<h2 className='text-xl mb-3'>Link created</h2>
			<input
				className='block w-full text-3xl p-2 rounded-lg bg-transparent border-2 border-[rgb(var(--black))]'
				type='text'
				value={`https://shorly.cc/${link.alias}`}
				readOnly
			/>
		</div>
	)
}
