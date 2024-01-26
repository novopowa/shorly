import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type LINK } from '../types/links'

interface props {
	modalLink: LINK | undefined
	modalMode: null | 'insert' | 'update' | 'delete'
	editModal: (link: LINK) => void
	deleteModal: (link: LINK) => void
	closeModal: () => void
}

function useModalLink(): props {
	const [editLink, setEditLink] = useState<LINK>()
	const [modalMode, setModalMode] = useState<props['modalMode']>(null)
	const searchParams = useSearchParams()
	const router = useRouter()

	const closeModal = () => {
		setModalMode(null)
		router.replace('/dashboard')
	}

	const editModal = (link: LINK) => {
		setEditLink(link)
		setModalMode('update')
	}

	const deleteModal = (link: LINK) => {
		setEditLink(link)
		setModalMode('delete')
	}

	useEffect(() => {
		const setModalToInsertMode = searchParams.get('new') === 'link'
		if (setModalToInsertMode) {
			setEditLink(undefined)
			setModalMode('insert')
		}
	}, [searchParams])

	return { modalLink: editLink, modalMode, editModal, deleteModal, closeModal }
}

export default useModalLink
