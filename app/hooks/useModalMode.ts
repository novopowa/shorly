import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface props {
	modalMode: null | 'insert' | 'update'
	editModal: () => void
	closeModal: () => void
}

function useModalMode(): props {
	const [modalMode, setModalMode] = useState<props['modalMode']>(null)
	const searchParams = useSearchParams()
	const router = useRouter()

	const closeModal = () => {
		setModalMode(null)
		router.replace('/dashboard')
	}

	const editModal = () => {
		setModalMode('update')
	}

	useEffect(() => {
		const setModalToInsertMode = searchParams.get('new') === 'link'
		if (setModalToInsertMode) {
			setModalMode('insert')
		}
	}, [searchParams])

	return { modalMode, editModal, closeModal }
}

export default useModalMode
