import { type Database } from '@/app/types/database'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

export const revalidate = 0

export async function GET(request: NextRequest): Promise<Response> {
	const paramSecretCode = request.nextUrl.searchParams.get('code')

	if (paramSecretCode === null || paramSecretCode !== process.env.CRON_SECRET) {
		return new Response('Unauthorized', {
			status: 401
		})
	}

	const deleteAllAnonymousLinks = async (): Promise<void> => {
		const supabase = createServerComponentClient<Database>({ cookies })
		const oneDayAgoDate = new Date()
		oneDayAgoDate.setDate(new Date().getDate() - 1)
		const { error } = await supabase
			.from('links')
			.delete()
			.lt('created_at', `${oneDayAgoDate.toISOString().replace('T', ' ')}+00`)
			.is('user_id', null)
		if (error !== null) {
			throw new Error('Database error when delete old links')
		}
	}
	await deleteAllAnonymousLinks()
	return Response.json({})
}
