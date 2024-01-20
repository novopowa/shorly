import { securePage } from '@/app/utils/session'

async function Dashboard(): Promise<React.JSX.Element> {
	await securePage('user')

	return <>Dashboard</>
}

export default Dashboard
