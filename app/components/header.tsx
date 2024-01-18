import Menu from './menu'
import Title from './title'

function Header(): React.JSX.Element {
	return (
		<header className='flex gap-2'>
			<Title />
			<Menu />
		</header>
	)
}

export default Header
