import SigninOptions from '../signin-options'
import Button from '../ui/button'

function AnonymousHomeButtons({
	showSignUpOptions,
	loadingAnonymousButton,
	signUpLinkData
}: {
	showSignUpOptions: boolean
	loadingAnonymousButton: boolean
	signUpLinkData: { url: string; alias: string } | undefined
}) {
	return (
		<>
			<h2 className='uppercase text-center color-black pb-3'>Choose an option</h2>
			<div className='flex md:gap-1'>
				<Button type='submit' name='anonymousButton' withColor={false} loading={loadingAnonymousButton}>
					GET YOUR LINK
					<br />
					WITHOUT SIGN UP
					<span className='block text-xs'>Your link will expire in 24 hrs.</span>
				</Button>
				<Button type='submit' name='signupButton'>
					SIGN UP AND GET YOUR UNEXPIRING LINK
				</Button>
			</div>
			<div
				className={`absolute ${showSignUpOptions ? 'block -right-52' : 'hidden right-0'} -bottom-0  -translate-y-1/2 bgcolor-white rounded-r-lg p-4 animate-fade-right animate-duration-200`}>
				<SigninOptions signUpLinkData={signUpLinkData} />
			</div>
		</>
	)
}

export default AnonymousHomeButtons
