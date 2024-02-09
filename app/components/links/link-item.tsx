import Link from 'next/link'
import { type LINK } from '../../types/links'
import Button from '../ui/button'
import { IconEdit, IconCopy, IconTrash, IconArrowBigLeft } from '@tabler/icons-react'
import { Roboto_Mono } from 'next/font/google'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Countdown from 'react-countdown-simple'
import { useEffect, useState } from 'react'
import { getLinkVisits } from '@/app/services/links'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

export default function LinkItem({
	link,
	handleEditLink,
	handleDeleteLink,
	modalMode,
	handleAnonymousSubmitEnded
}: {
	link: LINK
	handleEditLink?: (link: LINK) => void
	handleDeleteLink?: (link: LINK) => void
	modalMode?: string | null
	handleAnonymousSubmitEnded?: () => void
}) {
	const linkUrl = `https://shorly.pw/${link.alias}`

	// VISITS
	const [visits, setVisits] = useState<string | null>(null)

	useEffect(() => {
		const getStatistics = async () => {
			const supabaseVisits = await getLinkVisits(link.id)
			setVisits(supabaseVisits)
		}
		modalMode !== undefined && getStatistics()
	}, [])

	// COUNTDOWN
	const oneDay = new Date(new Date().setHours(new Date().getHours() + 24)).toISOString()
	const renderer = ({
		days,
		hours,
		minutes,
		seconds
	}: {
		days: number
		hours: number
		minutes: number
		seconds: number
	}) => (
		<>
			{hours === 0 && minutes === 0 && seconds === 0
				? '24:00:00'
				: `${hours}:${minutes}:${seconds.toString().length === 1 ? `0${seconds}` : seconds}`}
		</>
	)

	const copyLinkUrl = async () => {
		await navigator.clipboard.writeText(linkUrl)
		toast('🔗 Link copied!')
	}

	return (
		<div className='flex flex-col gap-3 w-full h-full mx-auto color-black'>
			{modalMode === undefined && (
				<div className='border-b border-color-black pb-3'>
					<h2 className='text-2xl color-green'>Congratulations!</h2>
					<p>Your link is now live. Copy it and spread the word.</p>
				</div>
			)}
			<div className='flex items-center'>
				<div className='flex-1'>
					<Link
						href={linkUrl}
						target='_blank'
						className={`${robotoMono.className} tracking-tighter block w-full text-[1.61rem] py-2 rounded-lg bg-transparent underline underline-offset-[3px] hover:opacity-85`}>
						shorly.pw/<span className='color-green'>{link.alias}</span>
					</Link>
				</div>
				<div className='flex-[auto_5rem]'>
					<Button
						onclick={() => {
							copyLinkUrl()
						}}
						withColor={false}>
						<IconCopy /> Copy
					</Button>
				</div>
			</div>
			<div className='-mt-2 overflow-hidden whitespace-nowrap overflow-ellipsis opacity-90'>{link.url}</div>
			{modalMode !== undefined ? (
				<>
					<div className='grow overflow-hidden overflow-ellipsis line-clamp-3'>
						{link.description === null || link.description.length === 0 ? (
							<span className='opacity-60'>Edit to add a description</span>
						) : (
							link.description
						)}
					</div>
					<div className='flex gap-2 items-end'>
						<div className='w-1/3 -mb-2'>
							<Button
								withColor='color-error'
								onclick={() => {
									if (handleDeleteLink !== undefined) {
										handleDeleteLink(link)
									}
								}}>
								<IconTrash /> Delete
							</Button>
						</div>
						<div className='w-1/3 text-center text-sm'>
							Visits: <span className='font-bold'>{visits}</span>
						</div>
						<div className='w-20 ml-auto'>
							<Button
								onclick={() => {
									if (handleEditLink !== undefined) {
										handleEditLink(link)
									}
								}}>
								<IconEdit /> Edit
							</Button>
						</div>
					</div>
				</>
			) : (
				<div className='border-t border-color-black mt-1 pt-3'>
					<p className='font-bold'>
						LINK EXPIRES IN <Countdown targetDate={oneDay} renderer={renderer} />
					</p>
					<p className='text-md'>
						Sign up for a{' '}
						<Link href='/auth' className='font-bold color-green underline hover:opacity-85 underline-offset-2'>
							free account
						</Link>{' '}
						to enjoy <strong>limitless, everlasting links</strong> and effortless management in one place!
					</p>
					<p>
						<a
							className='block mt-2 color-green underline cursor-pointer hover:opacity-85 underline-offset-2'
							onClick={() => {
								handleAnonymousSubmitEnded !== undefined && handleAnonymousSubmitEnded()
							}}>
							<IconArrowBigLeft className='mr-2' />
							Create another link
						</a>
					</p>
				</div>
			)}
		</div>
	)
}
