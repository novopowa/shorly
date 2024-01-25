import { type ReactNode } from 'react'
import { IconX } from '@tabler/icons-react'

function Modal({
	children,
	title,
	modalMode,
	handleCloseModal
}: {
	children: ReactNode
	title: string
	modalMode: string
	handleCloseModal: () => void
}) {
	return (
		<>
			<div
				id='crud-modal'
				tabIndex={-1}
				aria-hidden='true'
				className='flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
				<div className='fixed inset-0 bg-black/60' aria-hidden='true' />
				<div className='relative w-full max-w-md max-h-full'>
					<div className='relative rounded-lg shadow bgcolor-white'>
						<div className='flex items-center justify-between px-5 py-3  border-b-2 border-[rgb(var(--black))]'>
							<h3 className='text-xl font-bold color-black'>{title}</h3>
							<button
								type='button'
								onClick={handleCloseModal}
								className='color-black bg-transparent hover:bg-[rgba(var(--black),0.20)] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center '
								data-modal-toggle='crud-modal'>
								<IconX />
								<span className='sr-only'>Close modal</span>
							</button>
						</div>
						<div className='p-5'>{children}</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Modal
