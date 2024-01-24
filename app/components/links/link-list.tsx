'use client'

import { type Session } from '@supabase/supabase-js'
import { getLinksByUserId } from '../../services/links'
import { type LINK } from '../../types/links'
import { useEffect, useState } from 'react'
import LinkItem from './link-item'
import { ClipLoader } from 'react-spinners'
import Modal from '../ui/modal'
import LinkForm from './link-form'
import { useRouter, useSearchParams } from 'next/navigation'

function LinkList({ session }: { session: Session }) {
	const [links, setLinks] = useState<LINK[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [modalMode, setModalMode] = useState<'insert' | 'update' | null>(null)
	const searchParams = useSearchParams()
	const router = useRouter()

	const handleCloseModal = () => {
		setModalMode(null)
		router.replace('/dashboard')
	}

	const handleEditLink = () => {
		setModalMode('update')
	}

	useEffect(() => {
		const setModalToInsertMode = searchParams.get('new') === 'link'
		if (setModalToInsertMode) {
			setModalMode('insert')
		}
	}, [searchParams])

	useEffect(() => {
		const getLinks = async () => {
			const databaseLinks: LINK[] = await getLinksByUserId(session.user.id)
			setLinks(databaseLinks)
			setLoading(false)
		}
		getLinks()
	}, [])

	return (
		<div>
			<ClipLoader
				loading={loading}
				size={40}
				color='rgb(var(--white))'
				cssOverride={{
					display: 'block',
					margin: '3rem auto'
				}}
			/>
			<div className='mx-auto max-w-7xl p-10'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{!loading &&
						links.map(link => (
							<div key={link.id} className=' p-6 border rounded-lg shadow bgcolor-white color-black'>
								<LinkItem link={link} handleEditLink={handleEditLink} />
							</div>
						))}
				</div>
			</div>
			{modalMode !== null && (
				<Modal title='Edit link X' modalMode={modalMode} handleCloseModal={handleCloseModal}>
					<LinkForm session={session} modalMode={modalMode} />
				</Modal>
			)}
		</div>
	)
}

export default LinkList
