// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'

import HomeBlock from './components/home/home-block'
import Wallpaper from './components/wallpaper'
import { getSession } from './utils/session'

export default async function Home() {
	const session = await getSession()
	/* const supabase = createServerComponentClient({ cookies })
	const { data: links } = await supabase.from('links').select()
	return <main>{JSON.stringify(links, null, 2)}</main> */

	return (
		<>
			<HomeBlock session={session} />
			<Wallpaper />
		</>
	)
}
