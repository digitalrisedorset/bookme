export interface KeystoneOrder {
    id: string
    orderReference: string
    orderNumber: number
    charge: number
    total: number
    user: {
        id: string
    }
    items: OrderItem[]
}

export interface OrderItem {
    id: string
    name: string
    description: string
    price: number
    quantity: number
}