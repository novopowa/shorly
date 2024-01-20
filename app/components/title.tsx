import { Bree_Serif } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
const bree = Bree_Serif({ subsets: ['latin'], weight: '400' })

function Title(): React.JSX.Element {
	return (
		<Link href='/' className={`flex gap-1 items-center w-50 mt-8 bgcolor-white h-12 rounded-r-lg`}>
			<Image src='/images/logo.webp' alt='Logo of Shorly' width={80} height={80} className='block h-20 w-20' priority />
			<h1 className={`uppercase -mt-1 text-3xl color-black mr-3 ${bree.className}`}>Shorly</h1>
		</Link>
	)
}

export default Title
