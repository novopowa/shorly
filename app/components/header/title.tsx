import { Bree_Serif } from 'next/font/google'
import Link from 'next/link'
import { Logo } from './logo'

const bree = Bree_Serif({ subsets: ['latin'], weight: '400' })

function Title() {
	return (
		<Link
			href='/'
			className={`flex gap-1 items-center w-50 mt-9 bgcolor-white h-12 rounded-r-lg shadow-[0_0_10px_rgba(0,0,0,0.6)]`}>
			<div className='h-20 w-20 bgcolor-white border-8 border-[rgb(var(--green))] rounded-full ml-1'>
				<Logo />
			</div>
			<h1 className={`uppercase -mt-1 text-3xl color-black mr-3 ${bree.className}`}>Shorly</h1>
		</Link>
	)
}

export default Title
