import {EventProps} from "./types";
import { VenueCreator } from "./events/venue";
import { HaircutTypeCreator } from "./events/haircutType";
import { HaircutTypeGroupCreator } from "./events/haircutTypeGroup"
import { DateFinder } from "./events/dateFinder";
import type { KeystoneContext } from "@keystone-6/core/src/types";
import { HairdresserCreator } from "./events/hairdresser";
import {getHour, getTime} from "../lib/date";
import {HolidayHairdresserCreator, HolidayOutletCreator, HolidayValidator} from "./events/holiday";
import {event} from "./sample-data/event";
import {CustomerCreator} from "./events/customer";
import {
    IMPORT_CUSTOMER,
    IMPORT_HAIRCUT_TYPE,
    IMPORT_VENUE,
    IMPORT_VENUE_HAIRCUT_GROUP,
    IMPORT_VENUE_HAIRDRESSER, IMPORT_VENUE_HAIRDRESSER_HOLIDAY,
    IMPORT_VENUE_HOLIDAY
} from "../seed-data";

export class EventCreator {
    private venueCreator: VenueCreator
    private venueHolidayCreator: HolidayOutletCreator
    private haircutTypeCreator: HaircutTypeCreator
    private haircutTypeGroupCreator: HaircutTypeGroupCreator
    private hairdresserCreator: HairdresserCreator
    private dateFinder: DateFinder
    private holidayValidator: HolidayValidator
    private hairdresserHolidayCreator: HolidayHairdresserCreator
    private customerCreator: CustomerCreator
    private context
    private data: EventProps[]

    constructor(context: KeystoneContext, step: number) {
        this.context = context
        this.data = event
        this.venueCreator = new VenueCreator(context)
        this.venueHolidayCreator = new HolidayOutletCreator(context)
        this.haircutTypeGroupCreator = new HaircutTypeGroupCreator(context)
        this.holidayValidator = new HolidayValidator(context)
        this.haircutTypeCreator = new HaircutTypeCreator(context)
        this.hairdresserCreator = new HairdresserCreator(context)
        this.hairdresserHolidayCreator = new HolidayHairdresserCreator(context)
        this.customerCreator = new CustomerCreator(context)
        this.dateFinder = new DateFinder()
        switch (step) {
            case IMPORT_VENUE: console.log('Import Venues')
                this.venueCreator.createAllVenues()
                break;
            case IMPORT_VENUE_HOLIDAY: console.log('Import Venues Holidays')
                this.venueHolidayCreator.createAllOutletHolidays()
                break;
            case IMPORT_VENUE_HAIRCUT_GROUP: console.log('Import Venues Haircut Group')
                this.haircutTypeGroupCreator.createAllHaircutGroupTypes()
                break;
            case IMPORT_HAIRCUT_TYPE: console.log('Import Venues Haircut Types')
                this.haircutTypeCreator.createAllHaircutTypes()
                break;
            case IMPORT_VENUE_HAIRDRESSER: console.log('Import Venues Hairdresser')
                this.hairdresserCreator.createAllHairdresser()
                break;
            case IMPORT_VENUE_HAIRDRESSER_HOLIDAY: console.log('Import Hairdresser Holidays')
                this.hairdresserHolidayCreator.createAllHairdresserHolidays()
                break;
            case IMPORT_CUSTOMER: console.log('Import Venue Customers')
                this.customerCreator.createAllCustomer()
                break;
        }
    }

    concatDateTime = (dateDay, dateTime) => {
        return dateDay.concat('T', dateTime, ':00.101Z')
    }

    /*
    eg: 2025-12-17T07:54:37.760Z
     */
    createEvent = async (venueId: string, hairdresserId: string, eventDate: string, day: string, startTime: string, endTime: string) => {
        if (venueId !== undefined && hairdresserId !== undefined) {
            //2025-02-18T09:00:00.101Z
            const isHairdresserHoliday = await this.holidayValidator.isHairdresserOnHoliday(hairdresserId, eventDate, startTime, endTime)
            const isVenueHoliday = await this.holidayValidator.isVenueOnHoliday(venueId, eventDate, startTime, endTime)

            if (isHairdresserHoliday || isVenueHoliday) return

            //console.log('create event', hairdresserId, day, startTime)

            await this.context.query.Event.createOne({
                data: {
                    day,
                    startTime: this.concatDateTime(eventDate, startTime),
                    endTime: this.concatDateTime(eventDate, endTime),
                    venue: { connect: { id: venueId } },
                    hairdresser: { connect: { id: hairdresserId } }
                },
                query: 'id',
            })
        }
    }

    deleteEvent = async (day: string) => {
        const result = await this.context.query.Event.findMany({
            data: {
                day
            },
            query: 'id',
        })

        if (result?.length > 0) {
            result.forEach(async (record: any) => {
                console.log('delete event', record?.id)
                await this.context.query.Event.deleteOne({ where: { id: record?.id } })
            })
        }
    }

    createEventForYear = async (event: EventProps) => {
        const venue = await this.venueCreator.getVenueByCode(event.venue)
        const hairdresser = await this.hairdresserCreator.getHairdresserByCode(event.hairdresser)

        const eventDates = this.dateFinder.getDatesByDay(event.day, 2025)

        for (let i = 0; i < eventDates.length; i++) {
            let startTime = 9
            let endTime = startTime + (event.duration + event.breakTime) / 60

            if (hairdresser?.id == '') continue

            while (endTime < getHour(event.endTime, 17)) {
                this.createEvent(
                    venue?.id,
                    hairdresser?.id,
                    eventDates[i],
                    event.day,
                    getTime(startTime),
                    getTime(endTime)
                )

                startTime = endTime
                endTime = startTime + (event.duration + event.breakTime) / 60
            }
        }
    }

    deleteEventForYear = async (event: EventProps) => {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

        for (let i = 0; i < days.length; i++) {
            await this.deleteEvent(days[i])
        }
    }

    createAllEvents = async () => {
        for (const event: EventProps of this.data) {
            console.log('create event for hairdresser', event.hairdresser)
            await this.createEventForYear(event)
        }
    }

    deleteAllEvents = async () => {
        for (const event: EventProps of this.data) {
            await this.deleteEventForYear(event)
        }
    }
}
