import {capitalise} from "./string";
import {getFormattedDate} from "./date";

export const itemName = (cartItem: any) => {
    return `${capitalise(cartItem.event.day)} ${cartItem.haircut.name}`
}

export const itemDescription = (cartItem: any) => {
    return `${getFormattedDate(cartItem.event.startTime)} with ${capitalise(cartItem.event.hairdresser.name)} for a ${cartItem.haircut.name}`
}