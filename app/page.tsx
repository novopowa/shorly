import HomeBlock from './components/home/home-block'
import Wallpaper from './components/home/wallpaper'
import { getSession } from './utils/session'

export default async function Home() {
	const session = await getSession()

	return (
		<>
			<HomeBlock session={session} />
			<Wallpaper session={session} />
		</>
	)
}
