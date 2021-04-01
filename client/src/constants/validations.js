const emailRegexPart1 = /^[a-zA-Z0-9._%+-=~`!#$^&*'/?|]+@/
const emailRegexPart2 = /[a-zA-Z0-9._\-~]+[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
const emailRegex = new RegExp(emailRegexPart1.source + emailRegexPart2.source)

export const emailValidation = (value) => value && emailRegex.test(value)

export const requiredValidation = (value) => !!value
