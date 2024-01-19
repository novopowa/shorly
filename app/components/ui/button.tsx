import { type MouseEventHandler, type ReactNode } from 'react'

function Button({
	children,
	onclick
}: {
	children: ReactNode
	onclick?: MouseEventHandler<HTMLButtonElement> | undefined
}): React.JSX.Element {
	return (
		<button
			onClick={onclick}
			className='color-white bg-[rgb(var(--green))] hover:bg-[rgba(var(--green),0.85)] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'>
			{children}
		</button>
	)
}

export default Button
