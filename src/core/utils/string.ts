export const camelize = (str: string): string => {
    const camelCase = str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
}