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

	const alias = context.params.alias
	const link: LINK = await getLinkByAlias(alias)
	return NextResponse.redirect(link.url)
}
