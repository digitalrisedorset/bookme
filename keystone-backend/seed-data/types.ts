export type VenueProps = {
    name: string
}

export type EventTypeProps = {
    name: string
}

export type VenueCode = 'bourne' | 'poole' | 'winton' | 'muscliff' | 'hamworthy'

export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type EventTypeCode = 'kyu' | 'ninja' | 'adult'

export type EventStatus = 'open' | 'complete'

export type EventProps = {
    venue: VenueCode,
    day: WeekDay,
    startTime: string,
    endTime: string,
    status: EventStatus,
    eventType: EventTypeCode
}