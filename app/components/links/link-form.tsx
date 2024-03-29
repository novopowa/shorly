'use client'

import Button from '../ui/button'
import Input from '../ui/input'
import Textarea from '../ui/textarea'
import AnonymousHomeButtons from '../home/anonymous-home-buttons'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { type LINK } from '../../types/links'
import { IconExclamationCircle, IconRefresh } from '@tabler/icons-react'
import { Roboto_Mono } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useAlias } from '../../hooks/useAlias'
import useLinkSubmit from '@/app/hooks/useLinkSubmit'
import ReCAPTCHA from 'react-google-recaptcha'
import { validateCaptcha } from '@/app/services/links'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

function LinkForm({
	session,
	handleAnonymousSubmit,
	modalMode,
	handleAfterSubmit,
	link
}: {
	session: Session | null
	handleAnonymousSubmit?: (link: LINK) => void
	modalMode?: string
	handleAfterSubmit?: () => void
	link?: LINK
}) {
	const [longURL, setLongURL] = useState<string>('')
	const [alias, setAlias, generateCode] = useAlias()
	const [description, setDescription] = useState<string | null>(null)
	const [loadingGenerateAlias, setLoadingGenerateAlias] = useState(false)
	const [validCaptcha, setValidCaptcha] = useState(false)
	const {
		formAction, // FORM ACTION
		handleSubmit, // SUBMIT EVENT FOR LOADINGS
		handleCaptcha, // CONTROL CAPTCHA CHANGE TO HIDE SIGN UP OPTIONS IF EXPIRES
		errors, // ERRORS ON SUBMIT
		signUpLinkData, // URL AND ALIAS FOR SET COOKIES FOR CREATE THE LINK IF USER IS SIGNING UP
		showSignUpOptions, // SHOW OR NOT THE DROPRIGHT MENU WITH THE SIGN UP OPTIONS
		loadingAnonymousButton, // SHOW OR NOT LOADING IN THE ANONYMOUS BUTTON
		loadingSubmitButton // SHOW OR NOT LOADING IN THE USER BUTTONS OF INSERT AND UPDATE
	} = useLinkSubmit({ url: longURL, alias, description, session, handleAnonymousSubmit, modalMode, handleAfterSubmit })

	useEffect(() => {
		if (link !== undefined) {
			setLongURL(link.url)
			setDescription(link.description)
		}
	}, [])

	return (
		<form className='w-full mx-auto' action={formAction} onSubmit={handleSubmit}>
			{modalMode === undefined && (
				<h2 className='color-black font-bold text-lg mb-2'>
					Create Your Short Link Now for <span className='color-green'>FREE!</span>
				</h2>
			)}
			<Textarea
				id='url'
				label='Paste the long URL to be shortened'
				handleOnChange={e => {
					setLongURL(e.target.value)
				}}
				value={longURL}
				required
			/>
			{modalMode === undefined || modalMode === 'insert' ? (
				<div className='flex flex-wrap md:flex-nowrap md:gap-1'>
					<span className={`${robotoMono.className} color-black font-semibold text-end pt-4`}>shorly.pw/</span>
					<div className='flex-[60%] md:flex-1'>
						<Input
							id='alias'
							label='Write or generate an Alias'
							max={5}
							value={alias}
							handleOnChange={e => {
								setAlias(e.target.value.length > 5 ? e.target.value.slice(0, 5) : e.target.value)
							}}
							required
						/>
					</div>
					<div className='mb-3 md:mb-0 -mt-2 md:mt-2 ml-auto'>
						<Button
							onclick={() => {
								setLoadingGenerateAlias(true)
								generateCode().then(() => {
									setLoadingGenerateAlias(false)
								})
							}}
							loading={loadingGenerateAlias}>
							<span className='flex [&>svg]:h-5'>
								<IconRefresh /> Generate
							</span>
						</Button>
					</div>
				</div>
			) : (
				<input type='hidden' name='alias' value={link?.alias} />
			)}
			<input type='hidden' name='isValid' value={(signUpLinkData !== undefined).toString()} />
			<div>
				{session !== null ? (
					<Textarea
						label='Add a description'
						id='description'
						max={150}
						value={description ?? undefined}
						handleOnChange={e => {
							setDescription(e.target.value)
						}}
					/>
				) : (
					<></>
				)}
			</div>
			{errors !== null && errors.length > 0 && (
				<div className='flex color-error p-4 text-sm mb-3 rounded-lg bg-[rgba(var(--red),0.1)]'>
					<IconExclamationCircle className='-mt-[0.15rem] mr-3' />
					<span className='sr-only'>Danger</span>
					<div>
						<span className='font-medium'>Please review and correct the following issues:</span>
						<ul className='mt-1.5 list-disc list-inside'>
							{errors.map(e => {
								return <li key={e}>{e}</li>
							})}
						</ul>
					</div>
				</div>
			)}
			{session === null && (
				<div className='flex justify-center mb-3'>
					<ReCAPTCHA
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''}
						onChange={(e: string | null) => {
							validateCaptcha(e).then(valid => {
								handleCaptcha(valid)
								setValidCaptcha(valid)
							})
						}}
					/>
					<input type='hidden' name='captcha' value={validCaptcha.toString()} />
				</div>
			)}
			<div>
				{session === null ? (
					<AnonymousHomeButtons
						loadingAnonymousButton={loadingAnonymousButton}
						showSignUpOptions={showSignUpOptions}
						signUpLinkData={signUpLinkData}
					/>
				) : (
					<div>
						{modalMode === undefined && (
							<Button type='submit' name='insertButton' loading={loadingSubmitButton}>
								GET YOUR LINK
							</Button>
						)}
						{modalMode === 'insert' && (
							<Button type='submit' name='insertButton' loading={loadingSubmitButton}>
								CREATE LINK
							</Button>
						)}
						{modalMode === 'update' && (
							<Button type='submit' name='updateButton' loading={loadingSubmitButton}>
								SAVE CHANGES
							</Button>
						)}
					</div>
				)}
			</div>
		</form>
	)
}

export default LinkForm
