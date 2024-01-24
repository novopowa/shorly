import DeleteCookies from '@/app/components/dashboard/delete-cookies'
import LinkList from '@/app/components/links/link-list'
import { insertLink } from '@/app/services/links'
import { getSession, securePage } from '@/app/utils/session'
import { cookies } from 'next/headers'

async function Dashboard() {
	await securePage('user')
	const session = await getSession()
	if (session === null) return

	async function deleteLinkDataCookies() {
		'use server'
		cookies().delete('url')
		cookies().delete('alias')
	}

	const newLinkUrl = cookies().get('url')?.value
	const newLinkAlias = cookies().get('alias')?.value
	if (newLinkUrl !== undefined && newLinkAlias !== undefined) {
		const formData = new FormData()
		formData.append('url', newLinkUrl)
		formData.append('alias', newLinkAlias)
		await insertLink(null, formData)
	}

	return (
		<>
			{newLinkUrl !== undefined && newLinkAlias !== undefined && (
				<DeleteCookies deleteLinkDataCookies={deleteLinkDataCookies} />
			)}
			<div className=' flex px-10 py-4 border-b-2 border-[rgb(var(--white))]'>
				<h2 className='text-2xl '>Dashboard</h2>
				<div className='ml-auto'></div>
			</div>
			<LinkList session={session} />
		</>
	)
}

export default Dashboard
