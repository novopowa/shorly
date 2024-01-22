import { type MouseEventHandler, type ReactNode } from 'react'

function Button({
	children,
	onclick,
	type = 'button',
	withColor = true,
	enabled = true
}: {
	children: ReactNode
	onclick?: MouseEventHandler<HTMLButtonElement> | undefined
	type?: 'button' | 'submit' | 'reset' | undefined
	withColor?: boolean
	enabled?: boolean
}) {
	return (
		<button
			type={type}
			onClick={onclick}
			className={`${withColor ? 'color-white bg-[rgb(var(--green))] hover:bg-[rgba(var(--green),0.85)]' : 'color-black bg-[rgb(var(--white))] hover:bg-[rgba(var(--black),0.15)] border-2 border-[rgba(var(--black),0.70)]'} outline-none font-medium rounded-lg text-sm w-full p-2.5 text-center`}
			disabled={!enabled}>
			{children}
		</button>
	)
}

export default Button
