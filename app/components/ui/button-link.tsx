import Link from 'next/link'
import { type ReactNode } from 'react'

function ButtonLink({
	children,
	href,
	target
}: {
	children: ReactNode
	href: string
	target: string | undefined
}): React.JSX.Element {
	return (
		<Link
			href={href}
			target={target}
			className='inline-flex items-center px-4 py-2 text-sm font-medium border border-color-gray  focus:z-10 bg-[rgb(var(--white))] color-black hover:bg-[rgba(var(--white),0.85)]'>
			{children}
		</Link>
	)
}

export default ButtonLink
