import type {KeystoneContext} from "@keystone-6/core/src/types";
import {isoFormatDMY} from "../../lib/date";
import {OutletHoliday} from "../../schemas/OutletHoliday";

export class HolidayValidator {

    private context

    constructor(context: KeystoneContext) {
        this.context = context
    }

    findHolidaysByHairdresserId = async (id: string) => {
        let records = await this.context.query.Holiday.findMany({
            where: { staff: { id: {"equals": id }} },
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