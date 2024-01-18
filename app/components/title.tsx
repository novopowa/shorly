import { Bree_Serif } from 'next/font/google'
import Image from 'next/image'
const bree = Bree_Serif({ subsets: ['latin'], weight: '400' })

function Title(): React.JSX.Element {
	return (
		<div
			className={`flex gap-1 items-center w-60 mt-8 bg-white h-12 rounded-r-lg`}>
			<Image
				src='/images/logo.webp'
				alt='Logo of Shorly'
				width={80}
				height={80}
				className='block h-20 w-20'
			/>
			<h1 className={`uppercase text-3xl black mr-3 ${bree.className}`}>
				Shorly
			</h1>
		</div>
	)
}

export default Title
