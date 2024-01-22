'use server'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'
import { type LINK } from '../types/links'
import { notFound } from 'next/navigation'

const supabase = createServerComponentClient<Database>({ cookies })

export const aliasIsRepeated = async (alias: string): Promise<boolean> => {
	'use server'
	const { data, error } = await supabase.from('links').select('alias').eq('alias', alias)
	if (error !== null) {
		notFound()
	}
	return data?.length > 0
}

export const getLinkByAlias = async (alias: string): Promise<LINK> => {
	const { error, data } = await supabase.from('links').select('*').eq('alias', alias)
	if (error !== null) {
		notFound()
	}
	return data[0] as unknown as LINK
}

export const getLinkByUserId = async (userId: string): Promise<LINK[]> => {
	const { error, data } = await supabase.from('links').select('*').eq('user_id', userId)
	if (error !== null) {
		notFound()
	}
	return data as unknown as LINK[]
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
