'use client'

import { useSession } from '../hooks/useSession'
import { type MENU } from '../types'
import ButtonLink from './ui/button-link'
import { type Session } from '@supabase/auth-helpers-nextjs'

function Menu({ session }: { session: Session | null }) {
	const { handleSignOut } = useSession()

	const menu: MENU[] = [
		{
			name: 'Create Link',
			action: '',
			permission: 'user'
		},
		{
			name: 'Dashboard',
			action: '/dashboard',
			permission: 'user'
		},
		{
			name: 'Report a bug',
			action: 'https://github.com/novopowa/shorly/issues',
			target: '_blank'
		},
		{
			name: 'Log out',
			action: () => {
				handleSignOut()
			},
			permission: 'user'
		},
		{
			name: 'Sign in',
			action: '/auth',
			permission: 'anonymous'
		}
	]

	const currentMenu = menu.filter(item =>
		session === null ? item.permission !== 'user' : item.permission !== 'anonymous'
	)

	return (
		<nav className='flex justify-end flex-1 mr-10'>
			<ul className='flex' role='group'>
				{currentMenu.map(item => {
					return (
						<li
							key={item.name}
							className='[&:first-child>a]:rounded-bl-lg [&:first-child>button]:rounded-bl-lg [&:last-child>a]:rounded-br-lg [&:last-child>button]:rounded-br-lg'>
							<ButtonLink action={item.action} target={item.target}>
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
