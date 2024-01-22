import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'
import { type LINK } from '../types/links'
import { notFound } from 'next/navigation'

const supabase = createClientComponentClient<Database>()

export const aliasIsRepeated = async (alias: string): Promise<boolean> => {
	const { data, error } = await supabase.from('links').select('alias').eq('alias', alias)
	if (error !== null) {
		notFound()
	}
	return data?.length > 0
}

export const insertLink = async (link: LINK): Promise<LINK> => {
	const { error, data } = await supabase
		.from('links')
		.insert({
			url: link.url,
			alias: link.alias,
			description: link.description,
			user_id: link.user_id
		})
		.select('*')
	if (error !== null) {
		notFound()
	}
	return data[0] as unknown as LINK
}

export const updateLink = async (link: LINK): Promise<LINK> => {
	return link
}

export const deleteLink = async (link: LINK): Promise<LINK> => {
	return link
}
