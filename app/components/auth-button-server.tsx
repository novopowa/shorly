import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthButtonClient from './auth-button-client'
import { cookies } from 'next/headers'

async function AuthButtonServer(): Promise<React.JSX.Element> {
	const supabase = createServerComponentClient({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()

	return <AuthButtonClient session={session} />
}

export default AuthButtonServer
