import { NextResponse, type NextRequest } from 'next/server'
import { type SupabaseClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
// import { type Database } from '@/app/types/database'
import { notFound } from 'next/navigation'
import { getSession } from '@/app/utils/session'
import { validate } from '@/app/utils/validations'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<NextResponse<unknown>> {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get('code')
	const url = requestUrl.searchParams.get('url')
	const alias = requestUrl.searchParams.get('alias')

	const insertLink = async (
		supabase: SupabaseClient<any, 'public', any>,
		url: string,
		alias: string
	): Promise<boolean> => {
		'use server'

		const { isValid } = await validate(url, alias)
		if (!isValid) notFound()

		const session = await getSession()
		if (session === null) notFound()

		const { error } = await supabase.from('links').insert({ url, alias, description: '', user_id: session?.user.id })
		if (error !== null) {
			notFound()
		}

		return true
	}

	if (code !== null) {
		const supabase = createRouteHandlerClient({ cookies })
		await supabase.auth.exchangeCodeForSession(code)
		if (url !== null && alias !== null) {
			await insertLink(supabase, url, alias)
		}
	}
	return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
