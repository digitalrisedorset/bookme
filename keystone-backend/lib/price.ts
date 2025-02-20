
export const getEventPrice = (base_price: number, shampoo: boolean, eventHostLevel: string): number => {
    let price = base_price

    switch (eventHostLevel) {
        case 'apprentice':
            price = base_price * 0.8
            break;
        case 'junior':
            price = base_price // same as base price
            break;
        case 'senior':
            price = base_price * 1.5
            break;
    }

    if (shampoo === 1) {
        price += 5
    }

    return parseInt(price * 100)
}