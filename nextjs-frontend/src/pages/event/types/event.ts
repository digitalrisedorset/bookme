export interface KeystoneEvent {
    id: string
    maximumAttendees: number
    name: string
    status: string
    day: string
    startTime: string
    endTime: string
    venue: string
    eventType: string
}

export interface KeystoneCartItem {
    id: string
    quantity: number
    event: {
        id: string
        price: number
        venue: {
            name: string
        }
        eventType: {
            name: string
        }
    }
}