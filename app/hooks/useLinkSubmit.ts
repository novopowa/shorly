import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { insertLink, updateLink } from '../services/links'
import { type LINK } from '../types/links'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { validateInsert, validateUpdate } from '../utils/validations'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

function useLinkSubmit({
	url,
	alias,
	description,
	session,
	handleAnonymousSubmit,
	modalMode,
	handleAfterSubmit
}: {
	url: string
	alias: string
	description: string | null
	session: Session | null
	handleAnonymousSubmit?: (link: LINK) => void
	modalMode?: string
	handleAfterSubmit?: () => void
}) {
	const router = useRouter()
	const [showSignUpOptions, setShowSignUpOptions] = useState(false)
	const [signUpLinkData, setSignUpLinkData] = useState<{ url: string; alias: string } | undefined>(undefined)
	const [errors, setErrors] = useState<string[]>([])
	const [loadingAnonymousButton, setLoadingAnonymousButton] = useState(false)
	const [loadingSubmitButton, setLoadingSubmitButton] = useState(false)
	const handleTypeOfSubmit = async (link: any, formData: FormData) => {
		if (modalMode === undefined || modalMode === 'insert') {
			return await insertLink(formData)
		} else if (modalMode === 'update') {
			return await updateLink(formData)
		}
	}
	const [formState, formAction] = useFormState(handleTypeOfSubmit, null)
	// WE REALLY USE ACTION FOR SUBMIT, SO THIS SUBMIT EVENT IS USED TO START THE BUTTON LOADING
	// IN THE FUTURE MAYBE CHANGE IT FOR useOptimistic
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		// @ts-expect-error TypeScript can't detect submitter but always exist
		const buttonSubmit = e.nativeEvent.submitter as HTMLButtonElement
		if (buttonSubmit.name === 'anonymousButton') {
			setLoadingAnonymousButton(true)
		}
		if (buttonSubmit.name === 'insertButton' || buttonSubmit.name === 'updateButton') {
			setLoadingSubmitButton(true)
		}
	}

	// VALIDATE WHILE USER WRITES ON INPUTS AND TEXTAREAS
	useEffect(() => {
		const validateOnChange = async () => {
			if (errors.length > 0) {
				let result = { isValid: false, errors: [''] }
				if (modalMode === undefined || modalMode === 'insert') {
					result = await validateInsert(url, alias, description)
				}
				if (modalMode === 'update') {
					result = validateUpdate(url, alias)
				}
				setErrors(result.errors)
			}
		}
		validateOnChange()
	}, [url, alias])

	// AFTER FORM IS VALIDATED IN THE SERVER:
	// - Show errors
	// - If there is no errors:
	//	 - Depending on the button clicked
	//	 	 - Show sign up options and save linkData to be sended to cookies
	// 		 - Send info of the created link to parent to show results
	//   - Show push up alert to inform the user that link has been created or updated
	//   - Close the modal if form has been opened there
	useEffect(() => {
		if (formState === null) return
		const link: LINK | null = formState?.link !== undefined ? formState?.link : null
		const formErrors: string[] = formState?.errors === undefined ? [] : formState?.errors
		const formIsSignUp: boolean = formState?.isSignUp === undefined ? false : formState?.isSignUp
		const formErrorsFiltered: string[] = formErrors.filter(e => e !== '')
		const formWithoutErrors: boolean = formErrorsFiltered.length === 0
		setErrors(formErrors)
		if (formWithoutErrors) {
			if (formIsSignUp) {
				const linkData = { url, alias }
				setSignUpLinkData(linkData)
				setShowSignUpOptions(true)
			} else {
				if (link !== null && session === null && handleAnonymousSubmit !== undefined) {
					handleAnonymousSubmit(link)
				}
				if (modalMode === 'insert' || (modalMode === undefined && session !== null)) {
					toast('🔗 Link created!')
					setTimeout(() => {
						router.push('/dashboard')
					}, 1000)
				} else if (modalMode === 'update') {
					toast('🔗 Link updated!')
				}
			}
			handleAfterSubmit !== undefined && handleAfterSubmit()
		} else {
			setLoadingAnonymousButton(false)
			setLoadingSubmitButton(false)
		}
	}, [formState])

	return {
		formAction, // FORM ACTION
		handleSubmit, // SUBMIT EVENT FOR LOADINGS
		errors, // ERRORS ON SUBMIT
		signUpLinkData, // URL AND ALIAS FOR SET COOKIES FOR CREATE THE LINK IF USER IS SIGNING UP
		showSignUpOptions, // SHOW OR NOT THE DROPRIGHT MENU WITH THE SIGN UP OPTIONS
		loadingAnonymousButton, // SHOW OR NOT LOADING IN THE ANONYMOUS BUTTON
		loadingSubmitButton // SHOW OR NOT LOADING IN THE USER BUTTONS OF INSERT AND UPDATE
	}
}

export default useLinkSubmit
