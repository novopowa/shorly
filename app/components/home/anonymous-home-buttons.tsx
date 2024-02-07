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
			<div className='flex flex-col md:flex-row gap-2 md:gap-1 [&>button]:min-h-20'>
				<Button type='submit' name='anonymousButton' withColor={false} loading={loadingAnonymousButton}>
					GET YOUR LINK
					<br />
					WITHOUT SIGN UP
					<span className='block text-xs'>Your link will expire in 24 hrs.</span>
				</Button>
				<Button type='submit' name='signupButton'>
					SIGN UP AND GET YOUR
					<br />
					UNEXPIRING LINK
				</Button>
			</div>
			<div
				className={`absolute ${showSignUpOptions ? 'block -right-0 -bottom-28 md:-right-52 md:-bottom-0' : 'hidden right-0'} left-0 md:left-auto -bottom-0  -translate-y-1/2 bgcolor-white rounded-b-lg md:rounded-r-lg p-4 animate-fade-down md:animate-fade-right animate-duration-200`}>
				<SigninOptions signUpLinkData={signUpLinkData} />
			</div>
		</>
	)
}

export default AnonymousHomeButtons
