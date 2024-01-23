import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'
import Header from './components/header/header'
import { getSession } from './utils/session'

const roboto = Roboto({ subsets: ['latin'], weight: '500' })

export const metadata: Metadata = {
	title: 'Shorly - URL Shortener',
	description: 'URL Shortener next app'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession()

	return (
		<html lang='en'>
			<body className={`${roboto.className}`}>
				<Header session={session} />
				<main>{children}</main>
			</body>
		</html>
	)
}
