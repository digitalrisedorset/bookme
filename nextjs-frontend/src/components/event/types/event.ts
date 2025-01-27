export interface KeystoneEvent {
    id: string
    name: string
    status: string
    day: string
    startTime: string
    endTime: string
    venue: { name: string }
    hairdresser: Hairdresser
    orderItem?: {event: { id:string }}
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
    price: number
    haircut: {
        name: string
    }
    shampoo
    event: KeystoneEvent
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
    haircutType?: string // Pick<HaircutType, 'id' | 'name'>
    hairdressers: GroupEventHairdresserMap[] //Pick<Hairdresser, 'id' | 'name'>[]
    orderedEventId: string
    cartEvent?: KeystoneEvent
    eventIds: string[]
}

export interface GroupEventHairdresserMap {
    eventId: string,
    hairdresserId: string
}

export interface DayScheduleEvent {
    id: string
    name: string
    day: string
    status: EventStatus
    startTime: string
    orderItem: {order: { user:{name:string} }}
}

export interface Hairdresser {
    id: string
    name: string
    haircutTypes?: HaircutType[]
}

export const WALKIN = 'walkin'

export const AVAILABLE = 'open'

export const PAST_EVENT = 'pastevent'
export const WALKIN_EVENT = 'walkin'
export const BOOKED_EVENT = 'incart'

export const PURCHASED_EVENT = 'wasordered'

export type EventStatus = 'open' | 'pastevent' | 'walkin' | 'wasordered' | (string & {})

export type EventFilterType = 'haircutType' | 'haircutTypeGroup' | 'hairdresser' | 'weekPreference' | (string & {})

export interface EventPreferenceFilterType {
    haircutType: string | null
    haircutTypeGroup?: string | null
    weekPreference: string
}

export interface EventScheduledFilterKeys {
    venue?: { "id": { "equals": string } },
    startTime?: { "gte": string },
    endTime?: { "lte": string },
    hairdresser?: { "id": { "equals": string } }
}

export interface EventFilterKeys {
    venue?: { "id": { "equals": string } },
    startTime?: { "gte": string },
    endTime?: { "lte": string },
    hairdresser?: { "id": { "in": string[] } }
}