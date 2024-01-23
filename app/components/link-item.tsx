import Link from 'next/link'
import { type LINK } from '../types/links'
import Button from './ui/button'
import { IconEdit, IconCopy } from '@tabler/icons-react'
import { Roboto_Mono } from 'next/font/google'

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: '700' })

export default function LinkItem({ link }: { link: LINK }) {
	return (
		<div className='flex flex-col gap-2 w-full mx-auto'>
			<div className='flex items-center'>
				<div className='flex-1'>
					<Link
						href={`shorly.pw/${link.alias}`}
						target='_blank'
						className={`${robotoMono.className} tracking-tighter block w-full text-[1.75rem] py-2 rounded-lg bg-transparent underline underline-offset-[3px] hover:opacity-85`}>
						shorly.cc/<span className='color-green'>{link.alias}</span>
					</Link>
				</div>
				<div className='flex-[auto_5rem]'>
					<Button withColor={false}>
						<IconCopy /> Copy
					</Button>
				</div>
			</div>
			<div className='overflow-hidden whitespace-nowrap overflow-ellipsis opacity-90'>{link.url}</div>
			<div className='flex gap-2 items-end'>
				<div className='flex-1 overflow-hidden overflow-ellipsis line-clamp-3 h-[4.6rem]'>
					{link.description !== null && link.description.length === 0 ? (
						<span className='opacity-60'>Edit to add a description</span>
					) : (
						link.description
					)}
				</div>
				<div className='w-20 ml-auto h-12'>
					<Button>
						<IconEdit /> Edit
					</Button>
				</div>
			</div>
		</div>
	)
}
