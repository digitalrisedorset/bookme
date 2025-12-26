import {EventProps} from "./types";
import { VenueCreator } from "./events/venue";
import { EventTypeCreator } from "./events/eventType";
import { EventTypeGroupCreator } from "./events/eventTypeGroup"
import { DateFinder } from "./events/dateFinder";
import type { KeystoneContext } from "@keystone-6/core/src/types";
import { EventHostCreator } from "./events/eventHost";
import {getHour, getMinutes, getTimeFromMinutes} from "../lib/date";
import {HolidayEventHostCreator, HolidayOutletCreator, HolidayValidator} from "./events/holiday";
import {event} from "./sample-data/event";
import {CustomerCreator} from "./events/customer";
import {
    IMPORT_CUSTOMER,
    IMPORT_EVENT_TYPE,
    IMPORT_VENUE,
    IMPORT_VENUE_EVENT_GROUP,
    IMPORT_VENUE_HAIRDRESSER, IMPORT_VENUE_HAIRDRESSER_HOLIDAY,
    IMPORT_VENUE_HOLIDAY, REPAIR_HAIRDRESSER
} from "../seed-data";

export class EventCreator {
    private venueCreator: VenueCreator
    private venueHolidayCreator: HolidayOutletCreator
    private eventTypeCreator: EventTypeCreator
    private eventTypeGroupCreator: EventTypeGroupCreator
    private eventHostCreator: EventHostCreator
    private dateFinder: DateFinder
    private holidayValidator: HolidayValidator
    private eventHostHolidayCreator: HolidayEventHostCreator
    private customerCreator: CustomerCreator
    private context
    private data: EventProps[]

    constructor(context: KeystoneContext, step: number) {
        this.context = context
        this.data = event
        this.venueCreator = new VenueCreator(context)
        this.venueHolidayCreator = new HolidayOutletCreator(context)
        this.eventTypeGroupCreator = new EventTypeGroupCreator(context)
        this.holidayValidator = new HolidayValidator(context)
        this.eventTypeCreator = new EventTypeCreator(context)
        this.eventHostCreator = new EventHostCreator(context)
        this.eventHostHolidayCreator = new HolidayEventHostCreator(context)
        this.customerCreator = new CustomerCreator(context)
        this.dateFinder = new DateFinder()
        switch (step) {
            case IMPORT_VENUE: console.log('Import Venues')
                this.venueCreator.createAllVenues()
                break;
            case IMPORT_VENUE_HOLIDAY: console.log('Import Venues Holidays')
                this.venueHolidayCreator.createAllOutletHolidays()
                break;
            case IMPORT_VENUE_EVENT_GROUP: console.log('Import Venues Haircut Group')
                this.eventTypeGroupCreator.createAllEventGroupTypes()
                break;
            case IMPORT_EVENT_TYPE: console.log('Import Venues Haircut Types')
                this.eventTypeCreator.createAllEventTypes()
                break;
            case IMPORT_VENUE_HAIRDRESSER: console.log('Import Venues EventHost')
                this.eventHostCreator.createAllEventHost()
                break;
            case IMPORT_VENUE_HAIRDRESSER_HOLIDAY: console.log('Import EventHost Holidays')
                this.eventHostHolidayCreator.createAllEventHostHolidays()
                break;
            case IMPORT_CUSTOMER: console.log('Import Venue Customers')
                this.customerCreator.createAllCustomer()
                break;
            case REPAIR_HAIRDRESSER: console.log('Repair EventHost without User')
                this.eventHostCreator.repairEventHost()
                break;
        }
    }

    concatDateTime = (dateDay, dateTime) => {
        return dateDay.concat('T', dateTime, ':00.101Z')
    }

    /*
    eg: 2025-12-17T07:54:37.760Z
     */
    createEvent = async (venueId: string, eventHostId: string, eventDate: string, day: string, startTime: string, endTime: string) => {
        if (venueId !== undefined && eventHostId !== undefined) {
            //2025-02-18T09:00:00.101Z
            const isEventHostHoliday = await this.holidayValidator.isEventHostOnHoliday(eventHostId, eventDate, startTime, endTime)
            const isVenueHoliday = await this.holidayValidator.isVenueOnHoliday(venueId, eventDate, startTime, endTime)

            if (isEventHostHoliday || isVenueHoliday) return

            await this.context.query.Event.createOne({
                data: {
                    day,
                    startTime: this.concatDateTime(eventDate, startTime),
                    endTime: this.concatDateTime(eventDate, endTime),
                    venue: { connect: { id: venueId } },
                    eventHost: { connect: { id: eventHostId } }
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
        const eventHost = await this.eventHostCreator.getEventHostByCode(event.eventHost)

        const eventDates = this.dateFinder.getDatesByDay(event.day, 2025)

         for (let i = 0; i < eventDates.length; i++) {
             // start time = 7:00
             let startTimeMinutes = getMinutes(event.startTime) * 60
             // end time = 7:23
             let endTimeMinutes = (startTimeMinutes + event.duration + event.breakTime)

             if (eventHost?.id == '') continue

             while (endTimeMinutes <= getHour(event.endTime, 17) * 60) {
                this.createEvent(
                    venue?.id,
                    eventHost?.id,
                    eventDates[i],
                    event.day,
                    getTimeFromMinutes(startTimeMinutes),
                    getTimeFromMinutes(endTimeMinutes)
                )

                startTimeMinutes = endTimeMinutes
                endTimeMinutes = (startTimeMinutes + event.duration + event.breakTime)
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
            console.log('create event for eventHost', event.eventHost)
            await this.createEventForYear(event)
            //break
        }
    }

    deleteAllEvents = async () => {
        for (const event: EventProps of this.data) {
            await this.deleteEventForYear(event)
        }
    }
}
