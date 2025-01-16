export const capitalise = (str: string) => {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(len, chr);