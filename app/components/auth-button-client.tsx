'use client'

import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Github } from './icons'
import { useRouter } from 'next/navigation'

function AuthButtonClient({ session }: { session: Session | null }): React.JSX.Element {
	const supabase = createClientComponentClient()
	const router = useRouter()

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
		router.refresh()
	}

	return (
		<>
			{session === null ? (
				<button
					onClick={() => {
						handleSignIn()
					}}
					type='button'
					className='text-white bg-[#24292F]  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  hover:bg-[#050708]/30 me-2 mb-2'>
					<Github />
					Sign in with Github
				</button>
			) : (
				<button
					onClick={() => {
						handleSignOut()
					}}
					type='button'
					className='text-white outline-2 outline-gray-400 bg-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2'>
					Sign out from Github
				</button>
			)}
		</>
	)
}

export default AuthButtonClient
