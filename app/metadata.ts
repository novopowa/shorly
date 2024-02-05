import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Shorly - The URL Shortener Project',
	description: 'URL Shortener Web App that allows creating links without registering',
	applicationName: 'Shorly',
	referrer: 'origin-when-cross-origin',
	metadataBase: new URL('https://shorly.pw'),
	appleWebApp: true,
	openGraph: {
		title: 'Shorly - The URL Shortener Project',
		description: 'URL Shortener Web App that allows creating links without registering',
		type: 'website',
		url: new URL('https://shorly.pw'),
		siteName: 'Shorly',
		locale: 'en'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Shorly - The URL Shortener Project',
		description: 'URL Shortener Web App that allows creating links without registering'
	},
	manifest: '/manifest.json',
	icons: {
		icon: [
			{
				rel: 'apple-touch-icon',
				url: '/images/apple-touch-icon-180x180.png',
				sizes: '180x180'
			},
			{
				rel: 'apple-touch-icon',
				url: '/images/apple-touch-icon-152x152.png',
				sizes: '152x152'
			},
			{
				rel: 'apple-touch-icon',
				url: '/images/apple-touch-icon-114x114.png',
				sizes: '114x114'
			}
		]
	}
}
