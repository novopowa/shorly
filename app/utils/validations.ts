import { aliasIsRepeated } from '../services/links'

const validateLongUrl = (longURL: string): string[] => {
	const longUrlRegex =
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/

	const longUrlFormatError = longUrlRegex.test(longURL) ? '' : 'Long URL has a wrong format.'
	const longUrlLengthError = longURL.length < 10000 ? '' : 'Long URL is too long.'
	return [longUrlFormatError, longUrlLengthError]
}

const validateAliasFormat = (alias: string): string => {
	const aliasRegex = /^[a-zA-Z0-9]{5}$/
	const aliasFormatError = aliasRegex.test(alias) ? '' : 'Alias has a wrong format.'
	return aliasFormatError
}

const validateAlias = async (alias: string): Promise<string[]> => {
	const aliasFormatError = validateAliasFormat(alias)
	const aliasRepeatedError = alias.length < 5 ? '' : !(await aliasIsRepeated(alias)) ? '' : 'Alias already in use.'
	return [aliasFormatError, aliasRepeatedError]
}

const validateDescription = (description: string | null): string[] => {
	if (description === null) return []
	const descriptionLengthError = description.length <= 150 ? '' : 'Description is too long (150 chars max).'
	return [descriptionLengthError]
}

const validateCaptcha = (captcha: boolean): string[] => {
	return captcha ? [] : ['Invalid captcha. Please try again.']
}

export const validateInsert = async (
	longURL: string,
	alias: string,
	description: string | null,
	captcha: boolean
): Promise<{ isValid: boolean; errors: string[] }> => {
	const longUrlErrors = validateLongUrl(longURL)
	const aliasError = await validateAlias(alias)
	const descriptionError = validateDescription(description)
	const captchaErrors = validateCaptcha(captcha)
	const allErrors = [...new Set(aliasError.concat(longUrlErrors, descriptionError, captchaErrors))]
	const isValid = allErrors.join('').length === 0
	return { isValid, errors: allErrors }
}

export const validateUpdate = (longURL: string, description: string | null): { isValid: boolean; errors: string[] } => {
	const longUrlErrors = validateLongUrl(longURL)
	const descriptionError = validateDescription(description)
	const allErrors = [...new Set(longUrlErrors.concat(descriptionError))]
	const isValid = allErrors.join('').length === 0
	return { isValid, errors: allErrors }
}

export const validateDelete = (alias: string, aliasOriginal: string): { isValid: boolean; errors: string[] } => {
	const aliasFormatError = validateAliasFormat(alias)
	const aliasDiferenceError =
		alias === aliasOriginal ? '' : 'The alias you entered does not match the alias of this link.'
	const errors = [...new Set([aliasFormatError, aliasDiferenceError])]
	const isValid = errors.join('').length === 0
	return { isValid, errors }
}
