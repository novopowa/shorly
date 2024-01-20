export interface MENU {
	icon?: React.JSX.Element
	name: string
	action: string | React.MouseEventHandler<HTMLButtonElement>
	target?: string
	session?: 'user' | 'anonymous'
}
