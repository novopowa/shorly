import { NextResponse, type NextRequest } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest): Promise<NextResponse<unknown>> {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get('code')
	const url = requestUrl.searchParams.get('url')
	const alias = requestUrl.searchParams.get('alias')

	if (code !== null) {
		const supabase = createRouteHandlerClient({ cookies })
		await supabase.auth.exchangeCodeForSession(code)
		if (url !== null && alias !== null) {
			cookies().set('url', url)
			cookies().set('alias', alias)
		}
	}
	return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
}
