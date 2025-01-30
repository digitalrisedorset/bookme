import type {KeystoneContext} from "@keystone-6/core/src/types";
import {isoFormatDMY} from "../../lib/date";
import {HairdresserHolidayProps, OutletHolidaysProps} from "../types";
import {VenueCreator} from "./venue";
import {HairdresserCreator} from "./hairdresser";
import { hairdresserHoliday} from "../sample-data/hairdresser";
import {outletHoliday} from "../sample-data/venue";


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
    private context

    private hairdresserCreator: HairdresserCreator

    private data: HairdresserHolidayProps[]

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = hairdresserHoliday
        this.hairdresserCreator = new HairdresserCreator(context)
    }

    getHasVenueSomeHolidays = async (id: string) => {
        let holidays = await this.context.query.Holiday.findMany({
            where: { staff: { "id": { "equals": id}} },
            query: 'id',
        })

        return parseInt(holidays?.length)
    }

    createHairdresserHoliday = async (holidayData: HairdresserHolidayProps) => {
        const hairdresserInfo = await this.hairdresserCreator.getHairdresserByCode(holidayData.code)
        const holidayAlreadyIn = await this.getHasVenueSomeHolidays(hairdresserInfo.id)

        if (hairdresserInfo && holidayAlreadyIn === 0) {
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
    private context

    private venueCreator: VenueCreator

    private data: OutletHolidaysProps[]

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = outletHoliday
        this.venueCreator = new VenueCreator(context)
    }

    findVenueByCode = (code: string) => {
        return this.venueCreator.getVenueByCode(code)
    }

    getHasVenueSomeHolidays = async (id: string) => {
        let venues = await this.context.query.OutletHoliday.findMany({
            where: { venue: { "id": { "equals": id}} },
            query: 'id',
        })

        return parseInt(venues?.length)
    }

    createOutletHoliday = async (holidayData: OutletHolidaysProps) => {
        const venueInfo = await this.findVenueByCode(holidayData.venue)
        const holidayAlreadyIn = await this.getHasVenueSomeHolidays(venueInfo.id)

        if (venueInfo && holidayAlreadyIn === 0) {
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