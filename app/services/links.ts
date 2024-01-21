import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'
import { type LINK } from '../types/links'
import { notFound } from 'next/navigation'

const supabase = createClientComponentClient<Database>()

export const insertLink = async (link: LINK): Promise<void> => {
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

export const updateLink = async (link: LINK): Promise<LINK> => {
	return link
}

export const deleteLink = async (link: LINK): Promise<LINK> => {
	return link
}
