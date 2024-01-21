import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'
import { type LINK } from '../types/links'
import { notFound } from 'next/navigation'

interface props {
	insertLink: (link: LINK) => Promise<LINK>
	updateLink: (link: LINK) => Promise<LINK>
	deleteLink: (link: LINK) => Promise<LINK>
}

export function useLinks(): props {
	const supabase = createClientComponentClient<Database>()

	const insertLink = async (link: LINK): Promise<void> => {
		const { error } = await supabase.from('links').insert({
			url: link.url,
			alias: link.alias,
			description: link.description,
			user_id: link.user_id
		})
		if (error !== null) {
			notFound()
		}
	}

	const updateLink = async (link: LINK): Promise<LINK> => {
		return link
	}

	const deleteLink = async (link: LINK): Promise<LINK> => {
		return link
	}

	return { insertLink, updateLink, deleteLink }
}
