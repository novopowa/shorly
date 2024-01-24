'use client'

import { useEffect } from 'react'

function DeleteCookies({ deleteLinkDataCookies }: { deleteLinkDataCookies: () => Promise<void> }) {
	useEffect(() => {
		deleteLinkDataCookies()
	}, [])

	return null
}

export default DeleteCookies
