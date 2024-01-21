import { type Session, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { type Database } from '../types/database'

export const getSession = async (): Promise<Session | null> => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()
	return session
}

export const securePage = async (permission: 'user' | 'anonymous'): Promise<void> => {
	const session = await getSession()
	if (permission === 'user' && session === null) {
		redirect('/')
	} else if (permission === 'anonymous' && session !== null) {
		redirect('/dashboard')
	}
}
