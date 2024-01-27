import { type LINK } from '@/app/types/links'
import { IconAlertTriangleFilled, IconExclamationCircle } from '@tabler/icons-react'
import Input from '../ui/input'
import Button from '../ui/button'
import { deleteLink } from '../../services/links'
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function LinkDelete({ handleAfterSubmit, link }: { handleAfterSubmit: () => void; link?: LINK }) {
	const [errors, formAction] = useFormState(deleteLink, null)
	const [loadingSubmitButton, setLoadingSubmitButton] = useState(false)

	const onSubmit = () => {
		setLoadingSubmitButton(true)
	}

	useEffect(() => {
		const formErrorsFiltered: string[] | undefined = errors?.filter((e: string) => e !== '')

		if (formErrorsFiltered !== undefined && formErrorsFiltered.length === 0) {
			toast('🔗 Link deleted!')
			handleAfterSubmit()
		} else {
			setLoadingSubmitButton(false)
		}
	}, [errors])

	return (
		<form action={formAction} onSubmit={onSubmit}>
			<div
				className='flex items-center p-4 mb-4 text-sm rounded-lg color-error border border-[rgb(var(--red))]'
				role='alert'>
				<div className='flex-shrink-0 inline w-4 h-4 me-5'>
					<IconAlertTriangleFilled />
				</div>
				<span className='sr-only'>Info</span>
				<div>
					<span className='font-medium'>DANGER ALERT!</span>
					<p>
						Deleting this link is an irreversible action.
						<br />
						Once deleted, the link cannot be recovered.
					</p>
				</div>
			</div>
			<div>
				<p className='color-black text-center'>To confirm the deletion of the link, please type the alias:</p>
				<p className='block mt-2 color-green text-center text-xl font-bold'>{link?.alias}</p>
				<Input id='alias' label={`Alias`} max={5} required />
				<input type='hidden' value={link?.alias} name='original_alias' />
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
			<div>
				<Button type='submit' loading={loadingSubmitButton}>
					DELETE LINK
				</Button>
			</div>
		</form>
	)
}

export default LinkDelete
