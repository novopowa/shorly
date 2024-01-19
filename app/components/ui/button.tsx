import { type MouseEventHandler, type ReactNode } from 'react'

function Button({
	children,
	onclick,
	withColor = true
}: {
	children: ReactNode
	onclick?: MouseEventHandler<HTMLButtonElement> | undefined
	withColor?: boolean
}): React.JSX.Element {
	return (
		<button
			onClick={onclick}
			className={`${withColor ? 'color-white bg-[rgb(var(--green))] hover:bg-[rgba(var(--green),0.85)]' : 'color-black bg-[rgb(var(--white))] hover:bg-[rgba(var(--black),0.15)] border-2 border-[rgba(var(--black),0.70)]'} outline-none font-medium rounded-lg text-sm w-full p-2.5 text-center`}>
			{children}
		</button>
	)
}

export default Button
