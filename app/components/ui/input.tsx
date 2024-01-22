import { Roboto_Mono } from 'next/font/google'
import { type ChangeEventHandler } from 'react'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

function Input({
	id,
	value,
	label,
	required,
	max,
	type = 'text',
	handleOnChange
}: {
	id: string
	value?: string
	label: string
	required?: boolean
	max?: number
	type?: string
	handleOnChange?: ChangeEventHandler<HTMLInputElement>
}) {
	return (
		<div className='relative z-0 w-full mb-5 pt-[0.37rem] group'>
			<input
				value={value}
				onChange={handleOnChange}
				type={type}
				name={id}
				id={id}
				className={`${robotoMono.className} block tracking-tighter font-semibold py-2.5 px-0 w-full color-black bg-transparent border-0 border-b-2 border-[rgb(var(--black))] appearance-non focus:outline-none focus:ring-0 focus:border-[rgb(var(--green))] peer`}
				placeholder=' '
				maxLength={max}
				spellCheck={false}
				autoComplete='off'
				required={required !== undefined}
			/>
			<label
				htmlFor={id}
				className='peer-focus:font-medium absolute text-[rgb(var(--black),0.70)] duration-300 transform -translate-y-6 scale-75 top-4 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[rgb(var(--green))] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>
				{label}
				{required === true ? ' *' : ''}
			</label>
		</div>
	)
}

export default Input
