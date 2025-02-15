import {padL} from "./string";

export const orderReference = (venue: any, orderNumber: number) => {
    return `${venue.orderPrefix}${padL(orderNumber, venue.orderPadding)}`
}