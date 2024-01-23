import LinkList from '@/app/components/links/link-list'
import { getSession, securePage } from '@/app/utils/session'

async function Dashboard() {
	await securePage('user')
	const session = await getSession()
	if (session === null) return

	return (
		<>
			<h2 className='text-2xl px-10 py-4 border-b-2 border-[rgb(var(--white))]'>Dashboard</h2>
			<LinkList session={session} />
		</>
	)
}

export default Dashboard
