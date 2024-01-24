'use client'

import Button from '../ui/button'
import Input from '../ui/input'
import Textarea from '../ui/textarea'
import AnonymousHomeButtons from '../home/anonymous-home-buttons'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { type LINK } from '../../types/links'
import { Reload } from '../icons'
import { Roboto_Mono } from 'next/font/google'
import { useState, type ChangeEvent } from 'react'
import { useAlias } from '../../hooks/useAlias'
import useLinkSubmit from '@/app/hooks/useLinkSubmit'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

function LinkForm({
	session,
	handleAnonymousSubmit,
	modalMode
}: {
	session: Session | null
	handleAnonymousSubmit?: (link: LINK) => void
	modalMode?: string
}) {
	const [longURL, setLongURL] = useState<string>('')
	const [alias, setAlias, generateCode] = useAlias()
	const [loadingGenerateAlias, setLoadingGenerateAlias] = useState(false)
	const {
		formAction, // FORM ACTION
		handleSubmit, // SUBMIT EVENT FOR LOADINGS
		errors, // ERRORS ON SUBMIT
		signUpLinkData, // URL AND ALIAS FOR SET COOKIES FOR CREATE THE LINK IF USER IS SIGNING UP
		showSignUpOptions, // SHOW OR NOT THE DROPRIGHT MENU WITH THE SIGN UP OPTIONS
		loadingAnonymousButton // SHOW OR NOT LOADING IN THE ANONYMOUS BUTTON
	} = useLinkSubmit({ url: longURL, alias, session, handleAnonymousSubmit })

	const handleOnTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setLongURL(e.target.value)
	}

	const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setAlias(e.target.value)
	}

	return (
		<form className='w-full mx-auto' action={formAction} onSubmit={handleSubmit}>
			<Textarea
				id='url'
				label='Paste the long URL to be shortened'
				handleOnChange={handleOnTextareaChange}
				value={longURL}
				required
			/>

			{modalMode === undefined || modalMode === 'insert' ? (
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
			) : (
				<></>
			)}
			<div>{session !== null ? <Textarea label='Add a description' id='description' max={150} /> : <></>}</div>
			<div id='errorUrl' className='text-red-700 text-sm mb-3'>
				{errors.map(e => (
					<p key={e}>{e}</p>
				))}
			</div>
			<div>
				{session === null ? (
					<AnonymousHomeButtons
						loadingAnonymousButton={loadingAnonymousButton}
						showSignUpOptions={showSignUpOptions}
						signUpLinkData={signUpLinkData}
					/>
				) : (
					<>
						<Button type='submit'>GET YOUR LINK</Button>
					</>
				)}
			</div>
		</form>
	)
}

export default LinkForm
