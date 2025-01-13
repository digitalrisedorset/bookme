import type {KeystoneContext} from "@keystone-6/core/src/types";
import {isoFormatDMY} from "../../lib/date";
import {HairdresserHolidayProps, OutletHolidaysProps, VenueProps} from "../types";
import {VenueCreator} from "./venue";
import {HairdresserCreator} from "./hairdresser";

export class HolidayValidator {

    private context

    constructor(context: KeystoneContext) {
        this.context = context
    }

    findHolidaysByHairdresserId = async (id: string) => {
        let records = await this.context.query.Holiday.findMany({
            where: { staff: { id: {"equals": id }}, status: {"equals": "approved" } },
            query: 'id startDate endDate',
        })

        return records
    }

    findHolidaysByVenueId = async (id: string) => {
        let records = await this.context.query.OutletHoliday.findMany({
            // where: { staff: { id: {"equals": id }} },
            query: 'id startDate endDate',
        })

        return records
    }

    isHairdresserOnHoliday = async (hairdresserId: string, eventDate: string, startTime: string, endTime: string) => {
        const holidays = await this.findHolidaysByHairdresserId(hairdresserId)
        return this.isDateOnHoliday(holidays, eventDate, startTime, endTime)
    }

    isVenueOnHoliday = async (venueId: string, eventDate: string, startTime: string, endTime: string) => {
        const holidays = await this.findHolidaysByVenueId(venueId)
        return this.isDateOnHoliday(holidays, eventDate, startTime, endTime)
    }

    isDateOnHoliday = (holidays: [], eventDate: string, startTime: string, endTime: string) => {
        if (holidays.length === 0) return false

        const result = holidays.reduce((result: boolean, holiday: any) => {
            const holidayStartDate = isoFormatDMY(holiday.startDate)
            const holidayEndDate = isoFormatDMY(holiday.endDate)
            const eventStartDate = new Date(this.concatDateTime(eventDate, startTime))
            const eventEndDate = new Date(this.concatDateTime(eventDate, endTime))

            // if (this.concatDateTime(eventDate, startTime) == '2025-02-18T09:00:00.101Z' && hairdresserId==='4c0a172c-b4a4-4096-9661-ea07c0b8ca42') {
            //     console.log('found hairdresser holidays conflict', {
            //         holidayStartDate,
            //         holidayEndDate,
            //         eventStartDate,
            //         eventEndDate
            //     })
            // }

            if ((eventStartDate > holidayStartDate)
                && (eventStartDate < holidayEndDate)
            ) {
                return true
            }

            if ((eventEndDate < holidayEndDate)
                && (eventEndDate > holidayStartDate)
            ) {
                return true
            }
        }, false)

        return result ?? false
    }

    concatDateTime = (dateDay, dateTime) => {
        return dateDay.concat('T', dateTime, ':00.101Z')
    }
}

export class HolidayHairdresserCreator {
    data = [
        {
            code: 'carlos',
            startDate: '2025-01-15T13:00:00.101Z',
            endDate: '2025-01-18T23:59:00.101Z',
            status: 'open'
        },
        {
            code: 'linda',
            startDate: '2025-02-17T00:00:00.101Z',
            endDate: '2025-02-22T23:59:00.101Z',
            status: 'approved'
        }
    ]

    private context

    private hairdresserCreator: HairdresserCreator

    constructor(context: KeystoneContext) {
        this.context = context
        this.hairdresserCreator = new HairdresserCreator(context)
    }

    createHairdresserHoliday = async (holidayData: HairdresserHolidayProps) => {
        const hairdresserInfo = await this.hairdresserCreator.getHairdresserByCode(holidayData.code)


        if (hairdresserInfo) {
             console.log(`👩 Adding new holiday for hairdresser: ${hairdresserInfo.name}`)
            await this.context.query.Holiday.createOne({
                data: {
                    staff: { connect: { id: hairdresserInfo.id}},
                    startDate: holidayData.startDate,
                    endDate: holidayData.endDate,
                    status: holidayData.status
                },
                query: 'id',
            })
        }
    }

    createAllHairdresserHolidays = async () => {
        for (const holiday: HairdresserHolidayProps of this.data) {
            await this.createHairdresserHoliday(holiday)
        }
    }
}

export class HolidayOutletCreator {
    data = [
        {
            venue: 'rachelle_bournemouth',
            name: 'March break',
            startDate: '2025-03-03T00:00:00.101Z',
            endDate: '2025-03-14T00:00:00.101Z'
        }
    ]

    private context

    private venueCreator: VenueCreator

    constructor(context: KeystoneContext) {
        this.context = context
        this.venueCreator = new VenueCreator(context)
    }

    findVenueByCode = (code: string) => {
        return this.venueCreator.getVenueByCode(code)
    }

    createOutletHoliday = async (holidayData: OutletHolidaysProps) => {
        const venueInfo = await this.findVenueByCode(holidayData.venue)

        if (venueInfo) {
            console.log(`👩 Adding new holiday for venue: ${venueInfo.name}`, venueInfo)
            await this.context.query.OutletHoliday.createOne({
                data: {
                    venue: { connect: { id: venueInfo.id}},
                    name: holidayData.name,
                    startDate: holidayData.startDate,
                    endDate: holidayData.endDate,
                },
                query: 'id',
            })
        }
    }

    createAllOutletHolidays = async () => {
        for (const holiday: OutletHolidaysProps of this.data) {
            await this.createOutletHoliday(holiday)
        }
    }
}