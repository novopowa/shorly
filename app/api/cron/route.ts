import { notFound } from 'next/navigation'
import { type Database } from '@/app/types/database'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

export function GET(request: NextRequest): Response {
	if (request.headers.get('Authorization') === `Bearer ${process.env.CRON_SECRET}`) {
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
				notFound()
			}
		}
		deleteAllAnonymousLinks()
		return Response.json({})
	} else {
		return Response.json({ error: 'SECRET KEY NEEDED' })
	}
}
