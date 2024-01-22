import Link from 'next/link'
import { type ReactNode } from 'react'

function ButtonLink({
	children,
	action,
	target
}: {
	children: ReactNode
	action: string | React.MouseEventHandler<HTMLButtonElement>
	target: string | undefined
}) {
	if (typeof action === 'string') {
		return (
			<Link
				href={action}
				target={target}
				className='inline-flex items-center px-4 py-2 text-sm font-medium border border-color-gray  focus:z-10 bg-[rgb(var(--white))] color-black hover:bg-[rgba(var(--white),0.85)]'>
				{children}
			</Link>
		)
	} else {
		return (
			<button
				onClick={action}
				className='inline-flex items-center px-4 py-2 text-sm font-medium border border-color-gray  focus:z-10 bg-[rgb(var(--white))] color-black hover:bg-[rgba(var(--white),0.85)]'>
				{children}
			</button>
		)
	}
}

export default ButtonLink
