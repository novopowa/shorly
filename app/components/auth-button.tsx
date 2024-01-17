'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Github } from './icons'
import { useEffect, useState } from 'react'

function AuthButton(): React.JSX.Element {
	const [session, setSession] = useState<Session | null>(null)
	const supabase = createClientComponentClient()

	const handleSignIn = async (): Promise<void> => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: 'http://localhost:3000/auth/callback'
			}
		})
	}

	const handleSignOut = async (): Promise<void> => {
		await supabase.auth.signOut()
	}

	useEffect(() => {
		const getSession = async (): Promise<void> => {
			const { data } = await supabase.auth.getSession()
			setSession(data.session)
		}
		getSession()
	}, [])

	return (
		<>
			{session === null ? (
				<button
					onClick={() => {
						handleSignIn()
					}}
					type='button'
					className='text-white bg-[#24292F] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-gray-500 hover:bg-[#050708]/30 me-2 mb-2'>
					<Github />
					Sign in with Github
				</button>
			) : (
				<button
					onClick={() => {
						handleSignOut()
					}}
					type='button'>
					Sign out from Github
				</button>
			)}
		</>
	)
}

export default AuthButton
