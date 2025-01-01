export interface KeystoneEvent {
    id: string
    name: string
    status: string
    day: string
    startTime: string
    endTime: string
    venue: string
    haircutType: string
    hairdresser: string
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
        haircutType: {
            name: string
        }
        hairdresser: string
    }
}

export interface DaysType {
    day: string
    dayLabel: string
}


export interface WeeksType {
    weekStart: string
    weekLabel: string
}

export interface DayGroupEvent {
    name: string
    day: string
    startTime: string
    venue: string
    haircutType: string[]
    hairdresser: string[]
}

export interface Hairdresser {
    id: string
    name: string
}