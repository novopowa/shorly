import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export function useSession(): { handleSignOut: () => Promise<void> } {
	const supabase = createClientComponentClient()
	const router = useRouter()

	const handleSignOut = async (): Promise<void> => {
		await supabase.auth.signOut()
		router.refresh()
	}

	return { handleSignOut }
}
