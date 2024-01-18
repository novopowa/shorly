// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import Header from './components/header'
import LinkForm from './components/link-form'
import Wallpaper from './components/wallpaper'

export default async function Home(): Promise<React.JSX.Element> {
	/* const supabase = createServerComponentClient({ cookies })
	const { data: links } = await supabase.from('links').select()
	return <main>{JSON.stringify(links, null, 2)}</main> */

	return (
		<>
			<Header />
			<main>
				<LinkForm />
				<Wallpaper />
			</main>
		</>
	)
}
