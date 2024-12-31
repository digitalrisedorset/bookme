export type VenueProps = {
    name: string
}

export type HaircutTypeProps = {
    name: string
    base_price: number
}

export type HairdresserProps = {
    name: string
    level: HaircutTypeCode
}

export type VenueCode = 'bourne' | 'poole' | 'winton' | 'muscliff' | 'hamworthy'

export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export type HaircutTypeCode = 'apprentice' | 'junior' | 'senior'

export type HairdresserCode = 'carlos' | 'linda' | 'paul'

export type EventStatus = 'open' | 'complete'

export type EventProps = {
    venue: VenueCode,
    day: WeekDay,
    startTime: string,
    duration: number,
    breakTime: number,
    status: EventStatus,
    haircutType: HaircutTypeCode,
    hairdresser: HairdresserCode
}