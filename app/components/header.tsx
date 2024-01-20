import { type Session } from '@supabase/auth-helpers-nextjs'
import Menu from './menu'
import Title from './title'

function Header({ session }: { session: Session | null }): React.JSX.Element {
	return (
		<header className='flex gap-2 mb-5'>
			<Title />
			<Menu session={session} />
		</header>
	)
}

export default Header
