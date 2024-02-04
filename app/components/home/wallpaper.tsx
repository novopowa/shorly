'use client'

import { useEffect, useState } from 'react'
import { getShowWallpaperByUserId, getUnsplashImage, setShowWallpaperByUserId } from '@/app/services/unsplash'
import Image from 'next/image'
import { type Session } from '@supabase/supabase-js'

function Wallpaper({ session }: { session: Session | null }) {
	const [url, setUrl] = useState<string | undefined>()
	const [show, setShow] = useState<boolean | undefined>(session === null)

	useEffect(() => {
		const getImage = async () => {
			const imageUrl: string | undefined = await getUnsplashImage(window.innerHeight)
			setUrl(imageUrl)
		}
		const getIfWallpaperIsShowed = async () => {
			if (session !== null) {
				const showWallpaper = await getShowWallpaperByUserId(session.user.id)
				setShow(showWallpaper)
			}
		}
		if (window.innerWidth >= 768) {
			getImage()
			getIfWallpaperIsShowed()
		}
	}, [])

	useEffect(() => {
		if (session !== null && show !== undefined) {
			setShowWallpaperByUserId(session.user.id, show)
		}
	}, [show])

	const handleShowWallpaperChange = () => {
		setShow(currentShow => {
			if (currentShow === undefined) {
				return undefined
			}
			return !currentShow
		})
	}

	return (
		<div className='relative h-lvh -mt-32'>
			{url !== undefined && show === true && (
				<Image
					src={url}
					fill={true}
					alt='Home Wallpaper Background'
					className='object-cover animate-fade animate-duration-[2500ms] animate-delay-[1500ms] animate-ease-in'
				/>
			)}
			{session !== null && show !== undefined && (
				<div className='absolute bottom-0 right-0 bg-black bg-opacity-60 pt-3 pl-3 rounded-tl-xl'>
					<label className='relative inline-flex items-center me-3 cursor-pointer'>
						<input
							type='checkbox'
							value=''
							className='sr-only peer'
							checked={show}
							onChange={handleShowWallpaperChange}
						/>
						<div className="w-11 h-6 rounded-full peer bg-gray-700 peer-focus:ring-4 peer-focus:ring-[rgb(var(--green))] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-[rgb(var(--white))] after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-[rgb(var(--white))] after:border-rgb(var(--white)) after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgb(var(--green))]"></div>
						<span className='ms-3 text-sm font-medium'>Show Background Image</span>
					</label>
				</div>
			)}
		</div>
	)
}

export default Wallpaper
