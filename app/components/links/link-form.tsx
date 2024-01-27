'use client'

import Button from '../ui/button'
import Input from '../ui/input'
import Textarea from '../ui/textarea'
import AnonymousHomeButtons from '../home/anonymous-home-buttons'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { type LINK } from '../../types/links'
import { IconRefresh } from '@tabler/icons-react'
import { Roboto_Mono } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useAlias } from '../../hooks/useAlias'
import useLinkSubmit from '@/app/hooks/useLinkSubmit'

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
	const {
		formAction, // FORM ACTION
		handleSubmit, // SUBMIT EVENT FOR LOADINGS
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
				<div className='flex md:gap-1'>
					<span className={`${robotoMono.className} color-black font-semibold text-end pt-4 flex-1`}>shorly.pw/</span>
					<Input
						id='alias'
						label='Write or generate an Alias'
						max={5}
						value={alias}
						handleOnChange={e => {
							setAlias(e.target.value)
						}}
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
			<div id='errorUrl' className='color-error text-sm mb-3'>
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
