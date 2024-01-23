import { aliasIsRepeated } from '../services/links'

const validateLongUrl = (longURL: string): string[] => {
	const longUrlRegex =
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/

	const longUrlFormatError = longUrlRegex.test(longURL) ? '' : 'Long URL has a wrong format'
	const longUrlLengthError = longURL.length < 10000 ? '' : 'Long URL is too long'
	return [longUrlFormatError, longUrlLengthError]
}

const validateAlias = async (alias: string): Promise<string[]> => {
	const aliasRegex = /^[a-zA-Z0-9]{5}$/
	const aliasFormatError = aliasRegex.test(alias) ? '' : 'Alias has a wrong format'
	const aliasRepeatedError = alias.length < 5 ? '' : !(await aliasIsRepeated(alias)) ? '' : 'Alias already in use.'
	return [aliasFormatError, aliasRepeatedError]
}

export const validate = async (longURL: string, alias: string): Promise<{ isValid: boolean; errors: string[] }> => {
	const longUrlErrors = validateLongUrl(longURL)
	const aliasError = await validateAlias(alias)
	const allErrors = [...new Set(aliasError.concat(longUrlErrors))]
	const isValid = allErrors.join('').length === 0
	return { isValid, errors: allErrors }
}
