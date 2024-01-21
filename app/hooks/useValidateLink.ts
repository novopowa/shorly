import { useState } from 'react'

export function useValidateLink(): [(longURL: string, alias: string) => boolean, string[]] {
	const [errors, setErrors] = useState<string[]>([])

	const validateLongUrl = (longURL: string): string[] => {
		const longUrlRegex =
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/

		const longUrlFormatError = longUrlRegex.test(longURL) ? '' : 'Long URL has a wrong format'
		const longUrlLengthError = !(longURL.length > 10000) ? '' : 'Long URL is too long'
		return [longUrlFormatError, longUrlLengthError]
	}

	const validateAlias = (alias: string): string => {
		const aliasRegex = /^[a-zA-Z0-9]{5}$/
		const aliasError = aliasRegex.test(alias) ? '' : 'Alias has a wrong format'
		return aliasError
	}

	const validate = (longURL: string, alias: string): boolean => {
		const longUrlErrors = validateLongUrl(longURL)
		const aliasError = validateAlias(alias)
		setErrors([...new Set([aliasError].concat(longUrlErrors))])
		const isValid = longUrlErrors.join('').length === 0 && aliasError.length === 0
		return isValid
	}

	return [validate, errors]
}
