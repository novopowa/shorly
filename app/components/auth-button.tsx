'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { type Provider } from '@supabase/supabase-js'
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react'

function AuthButton({
	signUpLinkData,
	provider
}: {
	signUpLinkData?: { url: string; alias: string }
	provider: Provider
}) {
	const supabase = createClientComponentClient()

	const handleSignIn = async (): Promise<void> => {
		const linkData =
			signUpLinkData !== undefined
				? `?url=${encodeURIComponent(signUpLinkData.url)}&alias=${encodeURIComponent(signUpLinkData.alias)}`
				: ''
		const redirectUrl = `https://shorly.vercel.app/auth/callback${linkData}`
		await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: redirectUrl,
				queryParams: {
					access_type: 'offline',
					prompt: 'consent'
				}
			}
		})
	}

	return (
		<button
			onClick={() => {
				handleSignIn()
			}}
			type='button'
			className={`
				${provider === 'google' ? 'bg-[#4285F4] hover:bg-[#4285F4]/90' : ''}
				${provider === 'github' ? 'bg-[#24292F] hover:bg-[#050708]/80' : ''}
			 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center [&>svg]:h-4`}>
			{provider === 'google' && (
				<>
					<IconBrandGoogle /> Sign in with Google
				</>
			)}
			{provider === 'github' && (
				<>
					<IconBrandGithub /> Sign in with Github
				</>
			)}
		</button>
	)
}

export default AuthButton
