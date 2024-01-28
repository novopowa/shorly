'use client'

import Image from 'next/image'
import { useSession } from '../../hooks/useSession'
import { type MENU } from '../../types/menu'
import ButtonLink from '../ui/button-link'
import { type Session } from '@supabase/auth-helpers-nextjs'
import { IconLinkPlus, IconMenu2, IconX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

function Menu({ session }: { session: Session | null }) {
	const { handleSignOut } = useSession()
	const [opened, setOpened] = useState(false)

	const toogleMenu = () => {
		setOpened(currentState => !currentState)
	}
	const handleResize = () => {
		setOpened(current => (window.innerWidth > 768 ? true : current))
	}
	useEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const menu: MENU[] = [
		{
			icon: <IconLinkPlus />,
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
		<nav className='flex justify-end flex-1 mr-4 md:mr-10 h-8 md:h-9 '>
			<button onClick={toogleMenu} className='flex items-end md:hidden'>
				{opened ? (
					<IconX />
				) : (
					<>
						<span className='mr-2'>MENU</span>
						<IconMenu2 />
					</>
				)}
			</button>
			<ul
				className={`${opened ? '' : 'hidden'} flex flex-col md:flex-row absolute top-9 md:top-0 rounded-lg overflow-hidden md:rounded-none md:relative shadow-sm md:shadow-none z-20`}
				role='group'>
				{currentMenu.map(item => {
					return (
						<li
							key={item.name}
							className='md:[&:first-child>a]:rounded-bl-lg md:[&:first-child>button]:rounded-bl-lg md:[&:last-child>a]:rounded-br-lg md:[&:last-child>button]:rounded-br-lg 
							[&>a>svg]:h-5 [&>a>svg]:text-[rgb(var(--green))] [&>a>svg]:-mt-1 [&>a>svg]:-ml-2'>
							<ButtonLink
								action={item.action}
								target={item.target}
								className='w-full md:w-auto inline-flex items-center px-4 py-2 text-sm font-medium border border-color-gray  focus:z-10 bg-[rgb(var(--white))] color-black hover:bg-[rgba(var(--white),0.85)]'>
								{item.icon} {item.name}
							</ButtonLink>
						</li>
					)
				})}
				{session !== null && session.user.user_metadata.avatar_url !== undefined && (
					<li className='hidden md:inline-block '>
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
