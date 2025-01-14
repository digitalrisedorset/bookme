export type VenueProps = {
    name: string
}

export type HaircutTypeProps = {
    code: string
    name: string
    category: HaircutTypeGroupCode
    duration: number
    price: number
}

export type HaircutTypeGroupProps = {
    name: string,
    venue: string
}

export type HairdresserProps = {
    code: string
    name: string
    level: HaircutTypeCode
    haircutSpeciality: HaircutTypeGroupCode[]
    venue: string
}

export type HairdresserHolidayProps = {
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

export type HaircutTypeCode = 'apprentice' | 'junior' | 'senior'

export type HaircutTypeGroupCode = 'children' | 'ladies' | 'treatment' | 'colour'

export type HairdresserCode = 'carlos' | 'linda' | 'paul'

export type EventStatus = 'open' | 'complete'

export type EventProps = {
    venue: VenueCode,
    day: WeekDay,
    startTime: string,
    endTime: string,
    duration: number,
    breakTime: number,
    status: EventStatus,
    haircutType: HaircutTypeCode,
    hairdresser: HairdresserCode
}