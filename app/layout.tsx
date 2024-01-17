import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Shorly - URL Shortener',
	description: 'URL Shortener next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
