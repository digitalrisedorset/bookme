export const getEventCartQty = (cart: any, eventId): number => {
    const cartItem = cart?.filter((item: any) => item.event.id === eventId)
    if (cartItem && cartItem.length > 0) {
        return cartItem[0].quantity
    }

    return 0
}