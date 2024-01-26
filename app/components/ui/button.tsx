import { type MouseEventHandler, type ReactNode } from 'react'
import { ClipLoader } from 'react-spinners'

function Button({
	children,
	name,
	onclick,
	type = 'button',
	withColor = true,
	enabled = true,
	loading = false
}: {
	children: ReactNode
	name?: string
	onclick?: MouseEventHandler<HTMLButtonElement> | undefined
	type?: 'button' | 'submit' | 'reset' | undefined
	withColor?: boolean | string
	enabled?: boolean
	loading?: boolean
}) {
	return (
		<button
			type={type}
			name={name}
			onClick={onclick}
			className={`${
				typeof withColor === 'string'
					? `${withColor} hover:opacity-85 py-2.5 text-left`
					: withColor
						? 'color-white bg-[rgb(var(--green))] hover:bg-[rgba(var(--green),0.85)] p-2.5 text-center'
						: 'color-black bg-[rgb(var(--white))] hover:bg-[rgba(var(--black),0.05)] border-2 border-[rgba(var(--black),0.70)] p-2.5 text-center'
			} block relative w-full outline-none font-medium rounded-lg text-sm min-w-16 [&>svg]:-mt-1`}
			disabled={enabled ? loading : true}>
			<ClipLoader
				loading={loading}
				size={32}
				color={`rgb(var(${typeof withColor === 'string' ? `${withColor}` : withColor ? '--white' : '--black'}))`}
				cssOverride={{
					position: 'absolute',
					top: 'calc(50% - 16px)',
					left: 'calc(50% - 16px)'
				}}
			/>
			{loading ? <span className='opacity-0'>{children}</span> : children}
		</button>
	)
}

export default Button
