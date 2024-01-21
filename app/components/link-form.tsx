'use client'

import { Reload } from './icons'
import Button from './ui/button'
import Input from './ui/input'
import Textarea from './ui/textarea'
import { Roboto_Mono } from 'next/font/google'
import { useState, type ChangeEvent, useEffect } from 'react'
import { useAlias } from '../hooks/useAlias'
import { type Session } from '@supabase/auth-helpers-nextjs'
import AnonymousHomeButtons from './anonymous-home-buttons'
import { useValidateLink } from '../hooks/useValidateLink'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

function LinkForm({ session }: { session: Session | null }): React.JSX.Element {
	const [longURL, setLongURL] = useState<string>('')
	const [alias, setAlias, generateCode] = useAlias()
	const [validate, errors] = useValidateLink()
	const [signInOnSubmit, setSignInonSubmit] = useState<boolean>(false)
	const [showSigninOptions, setShowSigninOptions] = useState(false)

	const handleOnTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setLongURL(e.target.value)
	}

	const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setAlias(e.target.value)
	}

	useEffect(() => {
		if (errors.length > 0) {
			validate(longURL, alias)
		}
	}, [longURL, alias])

	const handleSigInButtonClick = (buttonOrigin: boolean): void => {
		setSignInonSubmit(buttonOrigin)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		const isValid: boolean = validate(longURL, alias)
		if (isValid) {
			if (signInOnSubmit) {
				setShowSigninOptions(true)
				// SAVE CURRENT LINK IN LOCAL STORAGE, SUBMIT, REDIRECT HOME AND RECOVERY LINK
			} else {
				setShowSigninOptions(false)
				// const form = e.target as unknown as HTMLFormElement
				if (session === null) {
					// SAVE LINK WITH ANONYMOUS USER
				} else {
					// SAVE LINK WITH CURRENT USER
				}
				// form.submit()
			}
		}
	}

	return (
		<form className='max-w-md mx-auto' onSubmit={handleSubmit}>
			<Textarea
				id='url'
				label='Paste the long URL to be shortened'
				handleOnChange={handleOnTextareaChange}
				value={longURL}
				required
			/>
			<div className='flex md:gap-1'>
				<span className={`${robotoMono.className} color-black font-semibold text-end pt-4 flex-1`}>shorly.cc/</span>
				<Input
					id='alias'
					label='Write or generate an Alias'
					max={5}
					value={alias}
					handleOnChange={handleOnInputChange}
					required
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
			<div id='errorUrl' className='text-red-700 text-sm'>
				{errors.map(e => (
					<p key={e}>{e}</p>
				))}
			</div>
			<div>
				{session === null ? (
					<AnonymousHomeButtons handleClick={handleSigInButtonClick} showSigninOptions={showSigninOptions} />
				) : (
					<Button type='submit'>GET YOUR LINK</Button>
				)}
			</div>
		</form>
	)
}

export default LinkForm
