import { type Session } from '@supabase/auth-helpers-nextjs'
import Menu from './menu'
import Title from './title'

function Header({ session }: { session: Session | null }) {
	return (
		<header className='relative flex gap-2 mb-11 z-20'>
			<Title />
			<Menu session={session} />
		</header>
	)
}

export default Header
