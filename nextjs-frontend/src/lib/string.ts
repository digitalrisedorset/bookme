export const capitalise = (str: string = '') => {
    if (str === null || str == undefined) return ''

    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}