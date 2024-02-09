import { type Database } from '@/app/types/database'
import { type LINK } from '@/app/types/links'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	context: { params: { alias: string } }
): Promise<NextResponse<unknown>> {
	const getLinkByAlias = async (alias: string): Promise<LINK> => {
		'use server'
		const supabase = createServerComponentClient<Database>({ cookies })
		const { error, data } = await supabase.from('links').select('*').eq('alias', alias)
		if (error !== null) {
			notFound()
		}
		return data[0] as unknown as LINK
	}

	const updateVisits = async (linkId: string): Promise<void> => {
		'use server'
		const supabase = createServerComponentClient<Database>({ cookies })
		const { error, data } = await supabase
			.from('statistics')
			.select('id, value')
			.eq('key', 'visits')
			.eq('link_id', linkId)
		if (error !== null) {
			notFound()
		} else {
			const id: string | null = data === null || data.length === 0 ? null : data[0].id
			const visits: string = data === null || data.length === 0 ? '1' : data[0].value
			if (id === null) {
				const { error } = await supabase
					.from('statistics')
					.insert({ key: 'visits', value: visits.toString(), link_id: linkId })
				if (error !== null) {
					notFound()
				}
			} else {
				const newVisits: number = parseInt(visits) + 1
				const { error } = await supabase
					.from('statistics')
					.update({ value: newVisits.toString() })
					.eq('id', id)
					.eq('key', 'visits')
				if (error !== null) {
					notFound()
				}
			}
		}
	}
	const alias = context.params.alias
	const link: LINK = await getLinkByAlias(alias)
	if (link.user_id !== null) {
		await updateVisits(link.id)
	}
	return NextResponse.redirect(link.url)
}
