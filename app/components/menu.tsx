import AuthButtonServer from './auth-button-server'

function Menu(): React.JSX.Element {
	return (
		<nav className='flex justify-end w-full h-12'>
			<AuthButtonServer />
		</nav>
	)
}

export default Menu
