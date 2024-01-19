// import AuthButtonServer from './auth-button-server'

import { type MENU } from '../types'
import ButtonLink from './ui/button-link'

const menu: MENU[] = [
	{
		name: 'Dashboard',
		href: ''
	},
	{
		name: 'Create Link',
		href: ''
	},
	{
		name: 'My links',
		href: ''
	},
	{
		name: 'Log out',
		href: ''
	}
]

function Menu(): React.JSX.Element {
	return (
		<nav className='flex justify-end flex-1 mr-10'>
			<ul className='flex' role='group'>
				{menu.map(item => {
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
