import AuthButton from './auth-button'

function SigninOptions({ signUpLinkData }: { signUpLinkData?: { url: string; alias: string } }) {
	return (
		<div className='flex flex-col gap-2 mx-auto'>
			<AuthButton provider='google' signUpLinkData={signUpLinkData} />
			<AuthButton provider='github' signUpLinkData={signUpLinkData} />
		</div>
	)
}

export default SigninOptions
