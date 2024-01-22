import { securePage } from '@/app/utils/session'

async function Dashboard() {
	await securePage('user')

	return <>Dashboard</>
}

export default Dashboard
