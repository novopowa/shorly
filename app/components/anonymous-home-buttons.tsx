import { useState } from 'react'
import SigninOptions from './signin-options'
import Button from './ui/button'

function AnonymousHomeButtons(): React.JSX.Element {
	const [showSigninOptions, setShowSigninOptions] = useState(false)

	const handleAnonymousLink = (): void => {
		setShowSigninOptions(false)
	}

	const handleSignIn = (): void => {
		setShowSigninOptions(true)
	}

	return (
		<>
			<h2 className='uppercase text-center color-black pb-3'>Choose an option</h2>
			<div className='flex md:gap-1'>
				<Button type='submit' withColor={false} onclick={handleAnonymousLink}>
					GET YOUR LINK
					<br />
					WITHOUT SIGN UP
					<span className='block text-xs'>Your link will expire in 24 hrs.</span>
				</Button>
				<Button onclick={handleSignIn}>SIGN UP AND GET YOUR UNEXPIRING LINK</Button>
			</div>
			<div
				className={`absolute ${showSigninOptions ? 'block -right-52' : 'hidden right-0'} -bottom-0  -translate-y-1/2 bgcolor-white rounded-r-lg p-4 animate-fade-right animate-duration-200`}>
				<SigninOptions />
			</div>
		</>
	)
}

export default AnonymousHomeButtons
