import type { Metadata } from 'next'
import './globals.css'
import { Roboto } from 'next/font/google'
import Header from './components/header/header'
import { getSession } from './utils/session'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
				<ToastContainer
					position='bottom-right'
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='colored'
					transition={Slide}
				/>
			</body>
		</html>
	)
}
