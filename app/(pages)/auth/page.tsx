import SigninOptions from '@/app/components/signin-options'
import { securePage } from '@/app/utils/session'

async function Auth() {
	await securePage('anonymous')
	return (
		<div className='flex mx-2 min-[460px]:mx-auto w-auto min-[460px]:w-full max-w-md bgcolor-white rounded-lg p-5 z-10'>
			<SigninOptions />
		</div>
	)
}

export default Auth
