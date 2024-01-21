import { useState } from 'react'

export function useValidateLink(): [(longURL: string, alias: string) => boolean, string[]] {
	const [errors, setErrors] = useState<string[]>([])

	const validateLongUrl = (longURL: string): string => {
		const longUrlRegex =
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
		const longUrlError = longUrlRegex.test(longURL) ? '' : 'Long URL has a wrong format'
		return longUrlError
	}

	const validateAlias = (alias: string): string => {
		const aliasRegex = /^[a-zA-Z0-9]{5}$/
		const aliasError = aliasRegex.test(alias) ? '' : 'Alias has a wrong format'
		return aliasError
	}

	const validate = (longURL: string, alias: string): boolean => {
		const longUrlError = validateLongUrl(longURL)
		const aliasError = validateAlias(alias)
		setErrors([...new Set([longUrlError, aliasError])])
		const isValid = longUrlError.length === 0 && aliasError.length === 0
		return isValid
	}

	return [validate, errors]
}
