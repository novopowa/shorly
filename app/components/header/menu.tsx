'use client'

import Image from 'next/image'
import { useSession } from '../../hooks/useSession'
import { type MENU } from '../../types/menu'
import ButtonLink from '../ui/button-link'
import { type Session } from '@supabase/auth-helpers-nextjs'

function Menu({ session }: { session: Session | null }) {
	const { handleSignOut } = useSession()

	const menu: MENU[] = [
		{
			name: 'Create Link',
			action: '/dashboard/?new=link',
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
				{session !== null && session.user.user_metadata.avatar_url !== undefined && (
					<li>
						<Image
							src={session.user.user_metadata.avatar_url}
							alt='User image'
							width={38}
							height={38}
							className='h-[38px] bgcolor-white rounded-br-3xl'
						/>
					</li>
				)}
			</ul>
		</nav>
	)
}

export default Menu
