export interface MENU {
	icon?: React.JSX.Element
	name: string
	href?: string
	action?: () => void
	target?: string
	permission?: 'user' | 'anonymous'
}
