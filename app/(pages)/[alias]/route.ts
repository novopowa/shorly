import { getLinkByAlias } from '@/app/services/links'
import { type LINK } from '@/app/types/links'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
	request: NextRequest,
	context: { params: { alias: string } }
): Promise<NextResponse<unknown>> {
	const alias = context.params.alias
	const link: LINK = await getLinkByAlias(alias)
	return NextResponse.redirect(link.url)
	// return NextResponse.redirect(`http://localhost:3000/`)
}
