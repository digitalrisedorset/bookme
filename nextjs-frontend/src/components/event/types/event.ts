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
    eventHost: EventHost
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
    eventType: EventType
    eventHost: EventHost
}

export interface KeystoneCartItem {
    id: string
    quantity: number
    price: number
    eventType: {
        name: string
    }
    shampoo: boolean
    event: KeystoneEvent
}

export interface DaysType {
    day: string
    dayLabel: string
}

export interface EventType {
    id: string
    name: string
}

export interface EventTypeGroup {
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
    eventType?: string // Pick<EventType, 'id' | 'name'>
    eventHosts: GroupEventEventHostMap[] //Pick<EventHost, 'id' | 'name'>[]
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
    eventHosts: [],
    orderedEventId: null,
    cartEvent: null,
    eventIds: []
}

export interface GroupEventEventHostMap {
    eventId: string,
    eventHostId: string
}

export interface EventHost {
    id: string
    name: string
    eventTypes?: EventType[]
}

export const WALKIN = 'walkin'

export const BUSY = 'unavailable'

export const AVAILABLE = 'open'

export const PAST_EVENT = 'pastevent'
export const WALKIN_EVENT = 'walkin'

export const UNAVAILABLE_EVENT= 'unavailable'

export const BOOKED_EVENT = 'incart'

export const PREFERENCE_RESET = 'reset'

export const PURCHASED_EVENT = 'wasordered'

export type EventStatus = 'open' | 'pastevent' | 'walkin' | 'wasordered' | (string & {})

export type EventFilterType = 'eventType' | 'eventTypeGroup' | 'eventHost' | 'weekPreference' | (string & {})

export const OPTION_SELECTED = 'checked'

export interface EventPreferenceFilterType {
    eventType?: string
    eventTypeGroup?: string
    weekPreference?: string
    eventHost?: string
}

export interface EventScheduledFilterKeys {
    venue?: { "id": { "equals": string } },
    startTime?: { "gte": string },
    endTime?: { "lte": string },
    eventHost?: { "id": { "equals": string } }
}

export interface EventFilterKeys {
    venue?: { "id": { "equals": string } },
    startTime?: { "gte": string },
    endTime?: { "lte": string },
    eventHost?: { "id": { "in": string[] } }
    status: { "equals": string }
}