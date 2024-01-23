'use client'

import { type Session } from '@supabase/supabase-js'
import { getLinksByUserId } from '../services/links'
import { type LINK } from '../types/links'
import { useEffect, useState } from 'react'
import LinkItem from './link-item'
import { ClipLoader } from 'react-spinners'

function LinkList({ session }: { session: Session }) {
	const [links, setLinks] = useState<LINK[]>([])
	const [loading, setLoading] = useState<boolean>(true)

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
								<LinkItem link={link} />
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default LinkList
