import {KeystoneCartItem} from "@/pages/event/types/event";

export const getEventCartQty = (cart: KeystoneCartItem[], eventIds: string[]): number => {
    const cartItem = cart?.filter((item: KeystoneCartItem) => eventIds.indexOf(item.event.id)>-1)
    if (cartItem && cartItem.length > 0) {
        return cartItem[0].quantity
    }

    return 0
}