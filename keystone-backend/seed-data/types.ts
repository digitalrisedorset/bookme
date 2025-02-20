export type VenueProps = {
    code: string
    name: string
}

export type EventTypeProps = {
    code: string
    name: string
    category: EventTypeGroupCode
    duration: number
    price: number
}

export type EventTypeGroupProps = {
    name: string,
    venue: string
}

export type CustomerProps = {
    name: string
    email: string
    venue: string
}

export type EventHostProps = {
    code: string
    name: string
    email: string
    level: EventTypeCode
    eventTypeSpeciality: EventTypeGroupCode[]
    venue: string
}

export type EventHostHolidayProps = {
    staff: string
    startDate: string
    endDate: string
    status: string
}

export type OutletHolidaysProps = {
    venue: string
    name: string
    startDate: string
    endDate: string
}

export type VenueCode = 'bourne' | 'poole' | 'winton' | 'muscliff' | 'hamworthy'

export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type EventTypeCode = 'apprentice' | 'junior' | 'senior'

export type EventTypeGroupCode = 'children' | 'ladies' | 'treatment' | 'colour'

export type EventHostCode = 'carlos' | 'linda' | 'paul'

export type EventStatus = 'open' | 'complete'

export type EventProps = {
    venue: VenueCode,
    day: WeekDay,
    startTime: string,
    endTime: string,
    duration: number,
    breakTime: number,
    status: EventStatus,
    eventType: EventTypeCode,
    eventHost: EventHostCode
}