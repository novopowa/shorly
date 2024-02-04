'use client'

import { useEffect, useState } from 'react'
import { getUnsplashImage } from '@/app/services/unsplash'
import Image from 'next/image'

function Wallpaper() {
	const [url, setUrl] = useState<string | undefined>()

	useEffect(() => {
		const getImage = async () => {
			const imageUrl: string | undefined = await getUnsplashImage(window.innerWidth)
			setUrl(imageUrl)
		}
		if (window.innerWidth >= 768) {
			getImage()
		}
	}, [])

	return (
		<div className='relative h-lvh -mt-32'>
			{url !== undefined && (
				<Image
					src={url}
					fill={true}
					alt='Home Wallpaper Background'
					className='object-cover animate-fade animate-duration-[2500ms] animate-delay-[2000ms] animate-ease-in'
				/>
			)}
			<div className='absolute bottom-0 right-0'>controls</div>
		</div>
	)
}

export default Wallpaper
