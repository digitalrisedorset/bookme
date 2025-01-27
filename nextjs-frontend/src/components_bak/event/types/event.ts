export interface KeystoneEvent {
    id: string
    name: string
    status: string
    day: string
    startTime: string
    endTime: string
    venue: Pick<Venue, 'name'>
    hairdresser: Hairdresser
    orderItem?: {event: { id:string }}
}

export interface Event {
    id: string
    price: number
    venue: Pick<Venue, 'name'>
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
    venue: Pick<Venue, 'name'>
    status: EventStatus
    haircutType?: string // Pick<HaircutType, 'id' | 'name'>
    hairdressers: string //Pick<Hairdresser, 'id' | 'name'>[]
    hairdresserEventMap: GroupEventHairdresserMap[]
    orderedEventId: string | null
    cartEvent: KeystoneEvent | null
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

export interface Venue {
    id: string
    name: string
}

export const WALKIN = 'walkin'

export const AVAILABLE = 'open'

export const PAST_EVENT = 'pastevent'
export const WALKIN_EVENT = 'walkin'
export const BOOKED_EVENT = 'incart'

export const PURCHASED_EVENT = 'wasordered'

export type EventStatus = 'open' | 'pastevent' | 'walkin' | 'wasordered' | (string & {})

export const EmptyGroup = {
    name: '',
    day: '',
    venue: { name: ''},
    status: '',
    startTime: '',
    hairdressers: [],
    orderedEventId: null,
    cartEvent: null,
    eventIds: []
}

export type EventFilterType = 'haircutType' | 'haircutTypeGroup' | 'hairdresser' | 'weekPreference' | (string & {})

export interface EventPreferenceFilterType {
    haircutType: string | null
    haircutTypeGroup?: string | null
    weekPreference: string
}

export interface EventFilterKeys {
    venue?: { id: { equals: string; }; }
    startTime?: { "gte": string }
    endTime?: { "lte": string }
    hairdresser?: { "id": { "in": string[] } }
}

export interface EventScheduledFilterKeys {
    venue?: { id: { equals: string; }; }
    startTime?: { "gte": string }
    endTime?: { "lte": string }
    hairdresser?: { "id": { "equals": string } }
}