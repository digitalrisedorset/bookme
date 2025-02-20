import {capitalise} from "./string";
import {getFormattedDate} from "./date";

export const itemName = (cartItem: any) => {
    return `${capitalise(cartItem.event.day)} ${cartItem.eventType.name}`
}

export const itemDescription = (cartItem: any) => {
    return `${getFormattedDate(cartItem.event.startTime)} with ${capitalise(cartItem.event.eventHost.name)} for a ${cartItem.eventType.name}`
}