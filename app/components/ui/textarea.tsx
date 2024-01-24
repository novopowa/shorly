'use client'

import { type ChangeEventHandler } from 'react'
import { Roboto_Mono } from 'next/font/google'
import TextareaAutosize from 'react-textarea-autosize'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

function Textarea({
	value,
	id,
	label,
	style,
	required,
	max,
	handleOnChange
}: {
	value?: string
	id: string
	label: string
	style?: any
	required?: boolean
	max?: number
	handleOnChange?: ChangeEventHandler<HTMLTextAreaElement>
}) {
	return (
		<div className='relative z-0 w-full mb-5 pt-[0.40rem] group'>
			<TextareaAutosize
				name={id}
				id={id}
				className={`${robotoMono.className} over block font-semibold tracking-tighter resize-none h-[46px] py-2.5 px-0 w-full color-black bg-transparent border-0 border-b-2 border-[rgb(var(--black))] appearance-non focus:outline-none focus:ring-0 focus:border-[rgb(var(--green))] peer`}
				style={style}
				placeholder=' '
				maxRows={10}
				maxLength={max}
				spellCheck={false}
				onChange={handleOnChange}
				required={required !== undefined}
				value={value}></TextareaAutosize>
			<label
				htmlFor={id}
				className='peer-focus:font-medium absolute text-[rgb(var(--black),0.70)]  duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[rgb(var(--green))] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
				{label}
				{required === true ? ' *' : ' (optional)'}
			</label>
		</div>
	)
}

export default Textarea
