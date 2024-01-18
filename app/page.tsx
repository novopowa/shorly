import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from './components/auth-button-server'

export default async function Home(): Promise<React.JSX.Element> {
	const supabase = createServerComponentClient({ cookies })
	const { data: links } = await supabase.from('links').select()

	return (
		<main>
			<AuthButtonServer />
			{JSON.stringify(links, null, 2)}
		</main>
	)
}
