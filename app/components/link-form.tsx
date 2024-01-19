'use client'

// import useGenerateAlias from '../hooks/useGenerateAlias'
import { Reload } from './icons'
import Button from './ui/button'
import Input from './ui/input'
import Textarea from './ui/textarea'
import { Roboto_Mono } from 'next/font/google'
import { type ChangeEvent } from 'react'
import { useAlias } from '../hooks/useAlias'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

function LinkForm(): React.JSX.Element {
	const [alias, setAlias, generateCode] = useAlias()

	const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setAlias(e.target.value)
	}

	return (
		<div className='absolute left-10 w-full max-w-96 top-1/2 transform -translate-y-1/2 bgcolor-white rounded-lg p-5 z-10'>
			<form className='max-w-md mx-auto'>
				<Textarea id='url' label='Paste de long URL to be shortened' required />
				<div className='flex md:gap-1'>
					<span className={`${robotoMono.className} color-black font-semibold text-end pt-4 flex-1`}>shorly.pw/</span>
					<Input id='alias' label='Write an Alias' max={5} value={alias} handleOnChange={handleOnInputChange} />
					<div className='flex-1 mt-2'>
						<Button
							onclick={() => {
								generateCode()
							}}>
							<span className='flex'>
								<Reload /> Generate
							</span>
						</Button>
					</div>
				</div>
				<div className='flex md:gap-1'>
					<Button type='submit' withColor={false}>
						GET YOUR LINK
						<span className='block text-xs'>
							No register required.
							<br />
							Link expires in 24 hrs.
						</span>
					</Button>
					<Button>SIGN UP AND GET YOUR LINK FOREVER</Button>
				</div>
			</form>
		</div>
	)
}

export default LinkForm
