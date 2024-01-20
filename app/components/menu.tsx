// import AuthButtonServer from './auth-button-server'

import { type MENU } from '../types'
import ButtonLink from './ui/button-link'
import { type Session } from '@supabase/auth-helpers-nextjs'

const menu: MENU[] = [
	{
		name: 'Create Link',
		href: '',
		session: 'user'
	},
	{
		name: 'Dashboard',
		href: '',
		session: 'user'
	},
	{
		name: 'Report a bug',
		href: ''
	},
	{
		name: 'Log out',
		href: '',
		session: 'user'
	},
	{
		name: 'Sign in',
		href: '',
		session: 'anonymous'
	}
]

function Menu({ session }: { session: Session | null }): React.JSX.Element {
	const currentMenu = menu.filter(item => (session === null ? item.session !== 'user' : item.session !== 'anonymous'))

	return (
		<nav className='flex justify-end flex-1 mr-10'>
			<ul className='flex' role='group'>
				{currentMenu.map(item => {
					return (
						<li key={item.name} className='[&:first-child>a]:rounded-bl-lg [&:last-child>a]:rounded-br-lg'>
							<ButtonLink href={item.href} target={item.target}>
								{item.icon} {item.name}
							</ButtonLink>
						</li>
					)
				})}
			</ul>
			{/* <AuthButtonServer /> */}
		</nav>
	)
}

export default Menu
