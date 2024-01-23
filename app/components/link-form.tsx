'use client'

import Button from './ui/button'
import Input from './ui/input'
import Textarea from './ui/textarea'
import AnonymousHomeButtons from './anonymous-home-buttons'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { type LINK } from '../types/links'
import { Reload } from './icons'
import { Roboto_Mono } from 'next/font/google'
import { useState, type ChangeEvent, useEffect } from 'react'
import { useAlias } from '../hooks/useAlias'
import { insertLink } from '../services/links'
import { useFormState } from 'react-dom'
import { validate } from '../utils/validations'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

function LinkForm({
	session,
	handleAnonymousSubmit
}: {
	session: Session | null
	handleAnonymousSubmit?: (link: LINK) => void
}) {
	const [longURL, setLongURL] = useState<string>('')
	const [alias, setAlias, generateCode] = useAlias()
	const [signUpOnSubmit, setSignUpOnSubmit] = useState<boolean>(false)
	const [showSignUpOptions, setShowSignUpOptions] = useState(false)
	const [formState, formAction] = useFormState(insertLink, null)
	const [errors, setErrors] = useState<string[]>([])
	// Loadings
	const [loadingAnonymousButton, setLoadingAnonymousButton] = useState(false)
	const [loadingGenerateAlias, setLoadingGenerateAlias] = useState(false)

	const handleOnTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setLongURL(e.target.value)
	}

	const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setAlias(e.target.value)
	}

	const handleSigInButtonClick = (buttonOrigin: boolean): void => {
		setSignUpOnSubmit(buttonOrigin)
	}

	useEffect(() => {
		const validateOnChange = async () => {
			if (errors.length > 0) {
				const { errors } = await validate(longURL, alias)
				setErrors(errors)
			}
		}
		validateOnChange()
	}, [longURL, alias])

	useEffect(() => {
		const link = formState?.link
		const formErrors: string[] = formState?.errors === undefined ? [] : formState?.errors
		setErrors(formErrors)
		if (link !== undefined && link !== null) {
			if (signUpOnSubmit) {
				// SAVE CURRENT LINK IN LOCAL STORAGE
				// WHEN ENTER DASHBOARD DETECT THAT THERE IS A LINK AND AUTO CREATE IT
				localStorage.setItem('link', JSON.stringify(link))
				setShowSignUpOptions(true)
			} else {
				localStorage.removeItem('link')
				setShowSignUpOptions(false)
				if (session === null) {
					setLoadingAnonymousButton(true)
					if (handleAnonymousSubmit !== undefined) {
						handleAnonymousSubmit(link)
					}
				}
			}
		}
	}, [formState])

	return (
		<form className='w-full mx-auto' action={formAction} /* onSubmit={handleSubmit} */>
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
				<div className='flex-[0_0_96px] fl mt-2'>
					<Button
						onclick={() => {
							setLoadingGenerateAlias(true)
							generateCode().then(() => {
								setLoadingGenerateAlias(false)
							})
						}}
						loading={loadingGenerateAlias}>
						<span className='flex'>
							<Reload /> Generate
						</span>
					</Button>
				</div>
			</div>
			<div id='errorUrl' className='text-red-700 text-sm mb-2'>
				{errors.map(e => (
					<p key={e}>{e}</p>
				))}
			</div>
			<div>
				<input type={session === null ? 'hidden' : 'text'} onChange={() => {}} name='description' value='' />
				{session === null ? (
					<AnonymousHomeButtons
						loadingAnonymousButton={loadingAnonymousButton}
						handleClick={handleSigInButtonClick}
						showSigninOptions={showSignUpOptions}
					/>
				) : (
					<Button type='submit'>GET YOUR LINK</Button>
				)}
			</div>
		</form>
	)
}

export default LinkForm
