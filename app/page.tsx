// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import LinkForm from './components/link-form'
import Wallpaper from './components/wallpaper'
import { getSession } from './utils/session'

export default async function Home() {
	const session = await getSession()
	/* const supabase = createServerComponentClient({ cookies })
	const { data: links } = await supabase.from('links').select()
	return <main>{JSON.stringify(links, null, 2)}</main> */

	return (
		<>
			<div className='absolute left-10 w-full max-w-md top-1/2 transform -translate-y-1/2 bgcolor-white rounded-lg p-5 z-10'>
				<LinkForm session={session} />
			</div>
			<Wallpaper />
		</>
	)
}
