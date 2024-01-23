'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Github } from './icons'

function AuthButton({ signUpLinkData }: { signUpLinkData?: { url: string; alias: string } }) {
	const supabase = createClientComponentClient()

	const handleSignIn = async (): Promise<void> => {
		const linkData =
			signUpLinkData !== undefined
				? `?url=${encodeURIComponent(signUpLinkData.url)}&alias=${encodeURIComponent(signUpLinkData.alias)}`
				: ''
		const redirectUrl = `http://localhost:3000/auth/callback${linkData}`
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: redirectUrl
			}
		})
	}

	return (
		<button
			onClick={() => {
				handleSignIn()
			}}
			type='button'
			className='text-white bg-[#24292F]  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  hover:bg-[#050708]/80'>
			<Github />
			Sign in with Github
		</button>
	)
}

export default AuthButton
