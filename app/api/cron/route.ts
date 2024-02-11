import { type Database } from '@/app/types/database'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

export const revalidate = 0

export function GET(request: NextRequest): Response {
	const authHeader = request.headers.get('authorization')
	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', {
			status: 401
		})
	}

	const deleteAllAnonymousLinks = async (): Promise<void> => {
		'use server'
		const supabase = createServerComponentClient<Database>({ cookies })
		const oneDayAgoDate = new Date()
		oneDayAgoDate.setDate(new Date().getDate() - 1)
		const { error } = await supabase
			.from('links')
			.delete()
			.lt('created_at', `${oneDayAgoDate.toISOString().replace('T', ' ')}+00`)
			.is('user_id', null)
		if (error !== null) {
			throw new Error(error as unknown as string)
		}
	}
	deleteAllAnonymousLinks()
	return Response.json({})
}
