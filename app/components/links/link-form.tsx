'use client'

import Button from '../ui/button'
import Input from '../ui/input'
import Textarea from '../ui/textarea'
import AnonymousHomeButtons from '../home/anonymous-home-buttons'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { type LINK } from '../../types/links'
import { Reload } from '../icons'
import { Roboto_Mono } from 'next/font/google'
import { useState, type ChangeEvent, useEffect } from 'react'
import { useAlias } from '../../hooks/useAlias'
import { insertLink } from '../../services/links'
import { useFormState } from 'react-dom'
import { validate } from '../../utils/validations'

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
	const [signUpLinkData, setSignUpLinkData] = useState<{ url: string; alias: string } | undefined>(undefined)
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

	const handleSigInButtonClick = (buttonOrigin: 'anonymous' | 'signup'): void => {
		setSignUpOnSubmit(buttonOrigin === 'signup')
	}

	// WE REALLY USE ACTION FOR SUBMIT, SO THIS SUBMIT EVENT IS USED TO START THE BUTTON LOADING
	const handleSubmit = (): void => {
		if (!signUpOnSubmit) {
			setLoadingAnonymousButton(true)
		}
	}

	// VALIDATE WHILE USER WRITES
	useEffect(() => {
		const validateOnChange = async () => {
			if (errors.length > 0) {
				const { errors } = await validate(longURL, alias)
				setErrors(errors)
			}
		}
		validateOnChange()
	}, [longURL, alias])

	// IF THERE ARE ERRORS THEY ARE SHOWED AFTER THE FORM IS VALIDATED, AND MAYBE INSERTED, ON THE SERVER
	// ALSO IF LINK HAS BEEN INSERTED AND DONE BY AN ANONYMOUS USER WE SEND IT TO PARENT TO SHOW LINK ITEM COMPONENT
	useEffect(() => {
		const link: LINK | null = formState?.link !== undefined ? formState?.link : null
		const formErrors: string[] = formState?.errors === undefined ? [] : formState?.errors
		setErrors(formErrors)
		if (link !== undefined && link !== null) {
			if (session === null) {
				setLoadingAnonymousButton(true)
				if (handleAnonymousSubmit !== undefined) {
					handleAnonymousSubmit(link)
				}
			}
		}
	}, [formState])

	// IF "CREATE LINK AND SIGN UP" BUTTON HAS BEEN PRESSED AND TEHRE IS NO ERRORS LINK IS SENDED
	// TROUGHT THE BUTTON TO BE INCLUDED AS A PARAM ON THE SIGN UP RETURN URL AND CREATED WHEN USER FINISH
	// THE SIGN UP
	useEffect(() => {
		if ((errors.length === 0 || errors[0].length === 0) && signUpOnSubmit) {
			const linkData = { url: longURL, alias }
			setSignUpLinkData(linkData)
			setShowSignUpOptions(true)
		}
	}, [errors])

	return (
		<form className='w-full mx-auto' action={formAction} onSubmit={handleSubmit}>
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
				{session === null ? <input type='hidden' name='signup' value={signUpOnSubmit ? 'true' : 'false'} /> : ''}
				{session === null ? (
					<AnonymousHomeButtons
						loadingAnonymousButton={loadingAnonymousButton}
						handleClick={handleSigInButtonClick}
						showSignUpOptions={showSignUpOptions}
						signUpLinkData={signUpLinkData}
					/>
				) : (
					<Button type='submit'>GET YOUR LINK</Button>
				)}
			</div>
		</form>
	)
}

export default LinkForm
