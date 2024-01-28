'use client'

import { type Session } from '@supabase/supabase-js'
import { getLinksByUserId } from '../../services/links'
import { type LINK } from '../../types/links'
import { useEffect, useState } from 'react'
import LinkItem from './link-item'
import { ClipLoader } from 'react-spinners'
import Modal from '../ui/modal'
import LinkForm from './link-form'
import useModalLink from '@/app/hooks/useModalLink'
import LinkDelete from './link-delete'
import Search from '../dashboard/search'

function LinkList({ session }: { session: Session }) {
	const [links, setLinks] = useState<LINK[]>([])
	const [linksFiltered, setLinksFiltered] = useState<LINK[]>(links)
	const [loading, setLoading] = useState<boolean>(true)
	const [hightlightNew, setHightlightNew] = useState<boolean>(false)
	const [hightlightUpdated, setHightlightUpdated] = useState<boolean>(false)
	const { modalLink, modalMode, editModal, deleteModal, closeModal } = useModalLink()

	const getLinks = async () => {
		setLoading(true)
		const databaseLinks: LINK[] = await getLinksByUserId(session.user.id)
		setLinks(databaseLinks)
		setLinksFiltered(databaseLinks)
		setLoading(false)
		setHightlightNew(modalMode === 'insert')
		setHightlightUpdated(modalMode === 'update')
	}

	const handleOnFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filter = e.target.value.toLowerCase()
		const linksAfterFilter = links.filter(
			link =>
				link.url.toLowerCase().includes(filter) ||
				link.alias.toLowerCase().includes(filter) ||
				(link.description !== null && link.description.toLowerCase().includes(filter))
		)
		setLinksFiltered(linksAfterFilter)
	}

	const handleAfterSubmit = () => {
		closeModal()
		getLinks()
	}

	useEffect(() => {
		getLinks()
	}, [])

	useEffect(() => {
		setHightlightUpdated(false)
	}, [modalLink])

	return (
		<>
			<Search handleOnFilterChange={handleOnFilterChange} />
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
				<div className='mx-auto max-w-7xl px-2 pb-2 pt-7 md:pt-10 md:p-10'>
					{!loading && linksFiltered.length === 0 && <div className='text-center'>NO LINKS FOUND</div>}
					<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4'>
						{!loading &&
							linksFiltered.length > 0 &&
							linksFiltered.map((link, i) => (
								<div
									key={link.id}
									className={`
								${
									hightlightUpdated && modalLink?.alias === link.alias
										? 'animate-pulse animate-twice animate-ease-in-out'
										: hightlightNew && i === 0
											? 'animate-fade animate-once animate-ease-in-out'
											: ''
								}  p-3 border rounded-lg shadow bgcolor-white color-black`}>
									<LinkItem
										link={link}
										handleEditLink={() => {
											editModal(link)
										}}
										handleDeleteLink={() => {
											deleteModal(link)
										}}
										modalMode={modalMode}
									/>
								</div>
							))}
					</div>
				</div>
				{modalMode === null ? (
					''
				) : modalMode === 'delete' ? (
					<Modal title={`DELETE LINK /${modalLink?.alias}`} modalMode={modalMode} handleCloseModal={closeModal}>
						<LinkDelete link={modalLink} handleAfterSubmit={handleAfterSubmit} />
					</Modal>
				) : (
					<Modal
						title={`
					${modalMode === 'insert' ? 'NEW LINK' : ''}
					${modalMode === 'update' ? `EDIT LINK /${modalLink?.alias}` : ''}
				`}
						modalMode={modalMode}
						handleCloseModal={closeModal}>
						<LinkForm session={session} modalMode={modalMode} link={modalLink} handleAfterSubmit={handleAfterSubmit} />
					</Modal>
				)}
			</div>
		</>
	)
}

export default LinkList
