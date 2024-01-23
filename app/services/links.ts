'use server'

import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Database } from '../types/database'
import { type LINK } from '../types/links'
import { notFound } from 'next/navigation'
import { validate } from '../utils/validations'
import { getSession } from '../utils/session'

const supabase = createServerComponentClient<Database>({ cookies })

export const aliasIsRepeated = async (alias: string): Promise<boolean> => {
	const { data, error } = await supabase.from('links').select('alias').eq('alias', alias)
	if (error !== null) {
		notFound()
	}
	return data?.length > 0
}

export const getLinksByUserId = async (userId: string): Promise<LINK[]> => {
	const { data, error } = await supabase
		.from('links')
		.select('*')
		.eq('user_id', userId)
		.order('created_at', { ascending: false })
	if (error !== null) {
		notFound()
	}
	return data as LINK[]
}

export const insertLink = async (link: any, formData: FormData): Promise<{ link: LINK | null; errors: string[] }> => {
	const url: string = formData.get('url')?.toString() ?? ''
	const alias: string = formData.get('alias')?.toString() ?? ''
	const description: string | null = formData.get('description')?.toString() ?? null
	const isSignUp: boolean = formData.get('signup')?.toString() === 'true'
	const { isValid, errors } = await validate(url, alias)
	if (isValid && !isSignUp) {
		const session = await getSession()
		const { error, data } = await supabase
			.from('links')
			.insert({ url, alias, description, user_id: session?.user.id })
			.select('*')
		if (error !== null) {
			return { link: null, errors: ['Database error'] }
		}
		const link: LINK = data[0] as unknown as LINK
		return { link, errors: [] }
	}
	return { link: null, errors }
}

export const updateLink = async (link: LINK): Promise<LINK> => {
	return link
}

export const deleteLink = async (link: LINK): Promise<LINK> => {
	return link
}
