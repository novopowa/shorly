import AuthButton from './auth-button'

function SigninOptions(): React.JSX.Element {
	return (
		<div className='flex flex-col gap-2 mx-auto'>
			<AuthButton />
			<AuthButton />
		</div>
	)
}

export default SigninOptions
