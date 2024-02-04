'use server'

export async function getUnsplashImage(width: number): Promise<string | undefined> {
	try {
		const apiURL = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
		const topics = ['iXRd8cmpUDI', 'bo8jQKTaE0Y', '6sMVjTLSkeQ', '_8zFHuhRhyo'] // Cool tones, wallpaper, nature, spirituallity
		const params = ['count=1', 'orientation=landscape', `topics=${topics.join(',')}`]
		const url = `${apiURL}&${params.join('&')}`
		const response = await fetch(url, { next: { revalidate: 300 } }) // Cache wallpaper for 5 min.
		const images = await response.json()
		return `${images[0].urls.raw}&q=75&w=${width}`
	} catch {
		return undefined
	}
}
