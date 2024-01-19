import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: '500' })

export const metadata: Metadata = {
	title: 'Shorly - URL Shortener',
	description: 'URL Shortener next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<html lang='en'>
			<body className={`${roboto.className}`}>{children}</body>
		</html>
	)
}
