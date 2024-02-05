import SigninOptions from '@/app/components/signin-options'
import { securePage } from '@/app/utils/session'

async function Auth() {
	await securePage('anonymous')
	return (
		<div className='mx-2 min-[460px]:mx-auto w-auto min-[460px]:w-full max-w-md bgcolor-white rounded-lg p-5 z-10'>
			<h2 className='color-black font-bold text-lg mb-4 text-center'>
				Sign In and Unlock <span className='color-green'>Limitless</span> Link Shortening Opportunities!
			</h2>
			<div className='flex '>
				<SigninOptions />
			</div>
		</div>
	)
}

export default Auth
