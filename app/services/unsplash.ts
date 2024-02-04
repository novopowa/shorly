'use server'

import { createApi } from 'unsplash-js'
import nodeFetch from 'node-fetch'
import { type Random } from 'unsplash-js/dist/methods/photos/types'

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: nodeFetch
})

export async function getUnsplashImage(width: number): Promise<string | undefined> {
	try {
		const images = await unsplash.photos.getRandom({ count: 1, orientation: 'landscape' })
		const img: Random[] = Array.isArray(images.response) ? images.response : []
		return `${img[0].urls.raw}&q=75&w=${width}`
	} catch {
		return undefined
	}
}
