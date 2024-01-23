'use client'

import { type Session } from '@supabase/auth-helpers-nextjs'
import LinkForm from '../links/link-form'
import { useState } from 'react'
import LinkItem from '../links/link-item'
import { type LINK } from '@/app/types/links'

export default function HomeBlock({ session }: { session: Session | null }) {
	const [anonymousLink, setAnonymousLink] = useState<LINK>()

	const handleAnonymousSubmit = (link: LINK): void => {
		setAnonymousLink(link)
	}

	return (
		<div className='absolute left-10 w-full max-w-md top-1/2 transform -translate-y-1/2 bgcolor-white rounded-lg p-5 z-10'>
			{anonymousLink === undefined ? (
				<LinkForm session={session} handleAnonymousSubmit={handleAnonymousSubmit} />
			) : (
				<LinkItem link={anonymousLink} />
			)}
		</div>
	)
}
