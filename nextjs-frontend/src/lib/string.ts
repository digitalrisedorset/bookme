export const capitalise = (str: string) => {
    if (str === null) return ''

    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}