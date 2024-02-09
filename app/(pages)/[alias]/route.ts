import { type Database } from '@/app/types/database'
import { type LINK } from '@/app/types/links'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { type NextRequest, NextResponse } from 'next/server'

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
			const id: string = data === null ? '' : data[0].id
			const visits: string = data === null ? '0' : data[0].value
			const newVisits: number = parseInt(visits) + 1
			const { error } = await supabase
				.from('statistics')
				.upsert({ id, key: 'visits', value: newVisits.toString(), link_id: linkId })
			if (error !== null) {
				notFound()
			}
		}
	}

	const alias = context.params.alias
	const link: LINK = await getLinkByAlias(alias)
	// await updateVisits(link.id)
	return NextResponse.redirect(link.url)
}
