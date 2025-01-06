import {KeystoneCartItem} from "@/pages/event/types/event";

export const getEventCartQty = (cart: KeystoneCartItem[], eventId: string): number => {
    const cartItem = cart?.filter((item: KeystoneCartItem) => item.event.id === eventId)
    if (cartItem && cartItem.length > 0) {
        return cartItem[0].quantity
    }

    return 0
}