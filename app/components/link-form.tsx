import Button from './ui/button'
import Input from './ui/input'
import Textarea from './ui/textarea'

function LinkForm(): React.JSX.Element {
	return (
		<div className='absolute left-10 w-full max-w-96 top-1/2 transform -translate-y-1/2 bgcolor-white rounded-lg p-5 z-10'>
			<form className='max-w-md mx-auto'>
				<Input id='name' label='URL name' />
				<Textarea id='url' label='URL to be shortened' required />
				<div className='flex md:gap-2'>
					<span className='color-black font-semibold text-end pt-4 flex-1'>shorly.pw/</span>
					<Input id='alias' label='Write or generate an Alias' max={5} />
					<div className='flex-1'>
						<Button>gen</Button>
					</div>
				</div>
				<Button>Submit</Button>
			</form>
		</div>
	)
}

export default LinkForm
