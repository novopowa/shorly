// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import Header from './components/header'
import LinkForm from './components/link-form'
import Wallpaper from './components/wallpaper'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Home(): Promise<React.JSX.Element> {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()
	/* const supabase = createServerComponentClient({ cookies })
	const { data: links } = await supabase.from('links').select()
	return <main>{JSON.stringify(links, null, 2)}</main> */

	return (
		<>
			<Header session={session} />
			<main>
				<LinkForm session={session} />
				<Wallpaper />
			</main>
		</>
	)
}
