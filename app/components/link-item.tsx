import Link from 'next/link'
import { type LINK } from '../types/links'
import Button from './ui/button'
import { IconEdit, IconCopy } from '@tabler/icons-react'

export default function LinkItem({ link }: { link: LINK }) {
	return (
		<div className='flex flex-col w-full mx-auto'>
			<div className='flex items-center'>
				<div className='flex-1'>
					<Link
						href={`shorly.pw/${link.alias}`}
						target='_blank'
						className='block  w-full text-3xl py-2 rounded-lg bg-transparent underline underline-offset-[3px] hover:opacity-85'>
						{`shorly.cc/${link.alias}`}
					</Link>
				</div>
				<div className='flex-[auto_5rem]'>
					<Button withColor={false}>
						<IconCopy /> Copy
					</Button>
				</div>
			</div>
			<div className='overflow-hidden whitespace-nowrap overflow-ellipsis py-3 opacity-90'>{link.url}</div>
			<div className='flex gap-2 items-end'>
				<div className='flex-1 overflow-auto h-20'>{link.description}</div>
				<div className='w-20 ml-auto h-12'>
					<Button>
						<IconEdit /> Edit
					</Button>
				</div>
			</div>
		</div>
	)
}
