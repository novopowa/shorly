import Link from 'next/link'
import { type LINK } from '../../types/links'
import Button from '../ui/button'
import { IconEdit, IconCopy, IconTrash } from '@tabler/icons-react'
import { Roboto_Mono } from 'next/font/google'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

export default function LinkItem({
	link,
	handleEditLink,
	handleDeleteLink
}: {
	link: LINK
	handleEditLink?: (link: LINK) => void
	handleDeleteLink?: (link: LINK) => void
}) {
	const linkUrl = `shorly.pw/${link.alias}`

	const copyLinkUrl = async () => {
		await navigator.clipboard.writeText(linkUrl)
		toast('🔗 Link copied!')
	}

	return (
		<div className='flex flex-col gap-3 w-full h-full mx-auto'>
			<div className='flex items-center'>
				<div className='flex-1'>
					<Link
						href={`https://${linkUrl}`}
						target='_blank'
						className={`${robotoMono.className} tracking-tighter block w-full text-[1.75rem] py-2 rounded-lg bg-transparent underline underline-offset-[3px] hover:opacity-85`}>
						shorly.cc/<span className='color-green'>{link.alias}</span>
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
			<div className='overflow-hidden whitespace-nowrap overflow-ellipsis opacity-90'>{link.url}</div>
			<div className='grow overflow-hidden overflow-ellipsis line-clamp-3'>
				{link.description === null || link.description.length === 0 ? (
					<span className='opacity-60'>Edit to add a description</span>
				) : (
					link.description
				)}
			</div>
			<div className='flex gap-2 items-end'>
				<div className='w-24'>
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
		</div>
	)
}
