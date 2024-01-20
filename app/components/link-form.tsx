'use client'

import { Reload } from './icons'
import Button from './ui/button'
import Input from './ui/input'
import Textarea from './ui/textarea'
import { Roboto_Mono } from 'next/font/google'
import { type ChangeEvent } from 'react'
import { useAlias } from '../hooks/useAlias'
import { type Session } from '@supabase/auth-helpers-nextjs'
import AnonymousHomeButtons from './anonymous-home-buttons'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

function LinkForm({ session }: { session: Session | null }): React.JSX.Element {
	const [alias, setAlias, generateCode] = useAlias()

	const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setAlias(e.target.value)
	}

	return (
		<form className='max-w-md mx-auto'>
			<Textarea id='url' label='Paste the long URL to be shortened' required />
			<div className='flex md:gap-1'>
				<span className={`${robotoMono.className} color-black font-semibold text-end pt-4 flex-1`}>shorly.cc/</span>
				<Input
					id='alias'
					label='Write or generate an Alias'
					max={5}
					value={alias}
					handleOnChange={handleOnInputChange}
				/>
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
			<div>{session === null ? <AnonymousHomeButtons /> : <Button type='submit'>GET YOUR LINK</Button>}</div>
		</form>
	)
}

export default LinkForm
