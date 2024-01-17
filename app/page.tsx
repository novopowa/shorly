import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButton from './components/auth-button'

export default async function Home(): Promise<React.JSX.Element> {
	const supabase = createServerComponentClient({ cookies })
	const { data: links } = await supabase.from('links').select()

	return (
		<main>
			<AuthButton />
			{JSON.stringify(links, null, 2)}
		</main>
	)
}
