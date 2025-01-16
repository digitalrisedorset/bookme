export interface KeystoneEvent {
    id: string
    name: string
    status: string
    day: string
    startTime: string
    endTime: string
    venue: { name: string }
    haircutType: string
    hairdresser: Hairdresser
    orderItem: {event: { id:string }}
}

export interface Event {
    id: string
    price: number
    venue: {
        name: string
    }
    haircutType: HaircutType
    hairdresser: Hairdresser
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

export interface HaircutType {
    id: string
    name: string
}

export interface HaircutTypeGroup {
    id: string
    name: string
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
    haircutType: Pick<HaircutType, 'id' | 'name'>
    hairdressers: Pick<Hairdresser, 'id' | 'name'>[]
    orderedEventId: string
    cartEvent?: KeystoneEvent
    eventIds: string[]
}

export interface Hairdresser {
    id: string
    name: string
    haircutTypes: HaircutType[]
}

export const WALKIN = 'walkin'

export const AVAILABLE = 'open'

export const PAST_EVENT = 'pastevent'
export const WALKIN_EVENT = 'walkin'
export const BOOKED_EVENT = 'incart'

export const PURCHASED_EVENT = 'wasordered'

export type EventStatus = 'open' | 'pastevent' | 'walkin' | 'wasordered' | (string & {})