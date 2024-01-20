import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'
import Header from './components/header'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], weight: '500' })

export const metadata: Metadata = {
	title: 'Shorly - URL Shortener',
	description: 'URL Shortener next app'
}

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<React.JSX.Element> {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()

	return (
		<html lang='en'>
			<body className={`${roboto.className}`}>
				<Header session={session} />
				<main>{children}</main>
			</body>
		</html>
	)
}
