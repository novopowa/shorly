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

	const handleAnonymousSubmitEnded = (): void => {
		setAnonymousLink(undefined)
	}

	return (
		<div className='absolute left-2 right-2 translate-x-0 min-[460px]:left-1/2 md:left-10 min-[460px]:-translate-x-1/2 md:-translate-x-0 w-auto min-[460px]:w-full max-w-md top-30 md:top-1/2 md:-translate-y-1/2 bgcolor-white rounded-lg p-2 pt-4 md:p-5 z-10'>
			{anonymousLink === undefined ? (
				<LinkForm session={session} handleAnonymousSubmit={handleAnonymousSubmit} />
			) : (
				<LinkItem link={anonymousLink} handleAnonymousSubmitEnded={handleAnonymousSubmitEnded} />
			)}
		</div>
	)
}
