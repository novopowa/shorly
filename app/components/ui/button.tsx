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
	withColor?: boolean
	enabled?: boolean
	loading?: boolean
}) {
	return (
		<button
			type={type}
			name={name}
			onClick={onclick}
			className={`${
				withColor
					? 'color-white bg-[rgb(var(--green))] hover:bg-[rgba(var(--green),0.85)]'
					: 'color-black bg-[rgb(var(--white))] hover:bg-[rgba(var(--black),0.05)] border-2 border-[rgba(var(--black),0.70)]'
			}	 
				block relative w-full outline-none font-medium rounded-lg text-sm min-w-16 p-2.5 text-center`}
			disabled={enabled ? loading : true}>
			<ClipLoader
				loading={loading}
				size={32}
				color={`rgb(var(${withColor ? '--white' : '--black'}))`}
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
