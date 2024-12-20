export const formatMoney = (amount: number = 0) => {
    const options = {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
    };

    // check if its a clean dollar amount
    if (amount % 100 === 0) {
        options.minimumFractionDigits = 0;
    }

    const formatter = Intl.NumberFormat('en-GB', options);

    return formatter.format(amount / 100);
}

export default function calcTotalPrice(cart) {
    return cart && cart.reduce((tally, cartItem) => {
        if (!cartItem.event) return tally; // products can be deleted, but they could still be in your cart
        return tally + cartItem.quantity * cartItem.event.price;
    }, 0);
}