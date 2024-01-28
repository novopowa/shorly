import Link from 'next/link'
import { type ReactNode } from 'react'

function ButtonLink({
	children,
	href = '',
	action,
	target,
	className
}: {
	children: ReactNode
	href?: string
	action?: () => void
	target: string | undefined
	className?: string
}) {
	if (href.length > 0) {
		return (
			<Link
				href={href}
				onClick={action}
				target={target}
				className={
					className ??
					'inline-flex items-center px-4 py-2 text-sm font-medium border border-color-gray  focus:z-10 bg-[rgb(var(--white))] color-black hover:bg-[rgba(var(--white),0.85)]'
				}>
				{children}
			</Link>
		)
	} else {
		return (
			<button
				onClick={action}
				className={
					className ??
					'inline-flex items-center px-4 py-2 text-sm font-medium border border-color-gray  focus:z-10 bg-[rgb(var(--white))] color-black hover:bg-[rgba(var(--white),0.85)]'
				}>
				{children}
			</button>
		)
	}
}

export default ButtonLink
