import {Venue} from "@/components/venue/types/venue";

export interface EventShare {
    id: string
    name: string
    startTime: string
    status: EventStatus
    endTime: string
    orderItem?: unknown
    day: string
}

export interface KeystoneEvent extends EventShare {
    venue: { name: string }
    hairdresser: Hairdresser
    orderItem?: {event: { id:string }}
}

export interface DayScheduleEvent extends EventShare {
    orderItem: {order: { user:{name:string} }}
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
    shampoo: boolean
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
    status: EventStatus
    startTime: string
    venue: Pick<Venue, 'name'>
    haircutType?: string // Pick<HaircutType, 'id' | 'name'>
    hairdressers: GroupEventHairdresserMap[] //Pick<Hairdresser, 'id' | 'name'>[]
    orderedEventId: string | null
    cartEvent: KeystoneEvent | null
    eventIds: string[]
}

export const EMPTY_GROUP_EVENT = {
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

export interface GroupEventHairdresserMap {
    eventId: string,
    hairdresserId: string
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

export const PREFERENCE_RESET = 'reset'

export const PURCHASED_EVENT = 'wasordered'

export type EventStatus = 'open' | 'pastevent' | 'walkin' | 'wasordered' | (string & {})

export type EventFilterType = 'haircutType' | 'haircutTypeGroup' | 'hairdresser' | 'weekPreference' | (string & {})

export interface EventPreferenceFilterType {
    haircutType?: string
    haircutTypeGroup?: string
    weekPreference?: string
    hairdresser?: string
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