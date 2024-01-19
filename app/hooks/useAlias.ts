import { useState } from 'react'
import { rand } from '../utils'

export function useAlias(): [string, (text: string) => void, () => void] {
	const [alias, setAlias] = useState<string>('')

	const generateCode = (): void => {
		const aliasLetters: string = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z'
		const aliasNumbers: string = '0,1,2,3,4,5,6,7,8,9'
		const aliasAllChars: string[] = [
			...aliasLetters.split(','),
			...aliasLetters.toUpperCase().split(','),
			...aliasNumbers.split(',')
		]
		const max: number = aliasAllChars.length - 1
		const char1: string = aliasAllChars[rand(0, max)]
		const char2: string = aliasAllChars[rand(0, max)]
		const char3: string = aliasAllChars[rand(0, max)]
		const char4: string = aliasAllChars[rand(0, max)]
		const char5: string = aliasAllChars[rand(0, max)]
		const code: string = `${char1}${char2}${char3}${char4}${char5}`
		setAlias(code)
	}

	return [alias, setAlias, generateCode]
}
