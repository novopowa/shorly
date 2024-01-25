import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type LINK } from '../types/links'

interface props {
	modalLink: LINK
	modalMode: null | 'insert' | 'update'
	editModal: (link: LINK) => void
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

	useEffect(() => {
		const setModalToInsertMode = searchParams.get('new') === 'link'
		if (setModalToInsertMode) {
			setEditLink(undefined)
			setModalMode('insert')
		}
	}, [searchParams])

	return { modalLink: editLink, modalMode, editModal, closeModal }
}

export default useModalLink
