'use client'

import { useState, type ReactNode } from 'react'
import { Roboto_Mono } from 'next/font/google'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })
const heightIncrement: number = 1.5
const maxLineWith: number = 39

function Textarea({
	children,
	id,
	label,
	required,
	max
}: {
	children?: ReactNode
	id: string
	label: string
	required?: boolean
	max?: number
}): React.JSX.Element {
	const [height, setHeight] = useState<number>(3)

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		let lines: number = Math.ceil(e.target.value.length / maxLineWith)
		lines = lines === 0 ? 1 : lines
		const rem = lines * heightIncrement + heightIncrement
		setHeight(rem)
	}

	return (
		<div className='relative z-0 w-full mb-5 pt-[0.37rem] group'>
			<textarea
				name={id}
				id={id}
				onChange={handleChange}
				className={`${robotoMono.className} block font-semibold tracking-tighter resize-none max-h-[20rem] py-2.5 px-0 w-full color-black bg-transparent border-0 border-b-2 border-[rgb(var(--black))] appearance-non focus:outline-none focus:ring-0 focus:border-[rgb(var(--green))] peer`}
				style={{ height: `${height}rem` }}
				placeholder=' '
				maxLength={max}
				required={required !== undefined}>
				{children}
			</textarea>
			<label
				htmlFor={id}
				className='peer-focus:font-medium absolute text-[rgb(var(--black),0.70)]  duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[rgb(var(--green))] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
				{label}
				{required === true ? ' *' : ''}
			</label>
		</div>
	)
}

export default Textarea
