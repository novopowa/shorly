// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import LinkForm from './components/link-form'
import Wallpaper from './components/wallpaper'
import { getSession } from './utils/session'

export default async function Home(): Promise<React.JSX.Element> {
	const session = await getSession()
	/* const supabase = createServerComponentClient({ cookies })
	const { data: links } = await supabase.from('links').select()
	return <main>{JSON.stringify(links, null, 2)}</main> */

	return (
		<>
			<LinkForm session={session} />
			<Wallpaper />
		</>
	)
}
