'use server'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'
import { notFound } from 'next/navigation'

const supabase = createServerComponentClient<Database>({ cookies })

export async function getUnsplashImage(height: number): Promise<string | undefined> {
	try {
		const apiURL = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
		const topics = ['iXRd8cmpUDI', 'bo8jQKTaE0Y', '6sMVjTLSkeQ', '_8zFHuhRhyo'] // Cool tones, wallpaper, nature, spirituallity
		const params = ['count=1', 'orientation=landscape', `topics=${topics.join(',')}`]
		const url = `${apiURL}&${params.join('&')}`
		const response = await fetch(url, { next: { revalidate: 300 } }) // Cache wallpaper for 5 min.
		const images = await response.json()
		return `${images[0].urls.raw}&q=85&h=${height}`
	} catch {
		return undefined
	}
}

export async function getShowWallpaperByUserId(userId: string): Promise<boolean> {
	const { data, error } = await supabase.from('users').select('show_wallpaper').eq('id', userId)
	if (error !== null) {
		notFound()
	}
	return data[0].show_wallpaper
}

export async function setShowWallpaperByUserId(userId: string, showWallpaper: boolean): Promise<void> {
	if (typeof showWallpaper !== 'boolean') return
	const { error } = await supabase.from('users').update({ show_wallpaper: showWallpaper }).eq('id', userId)
	if (error !== null) {
		notFound()
	}
}
