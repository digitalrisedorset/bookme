import { EventProps } from "./types";
import { VenueCreator } from "./events/venue";
import { HaircutTypeCreator } from "./events/haircutType";
import { HaircutTypeGroupCreator } from "./events/haircutTypeGroup"
import { DateFinder } from "./events/dateFinder";
import type { KeystoneContext } from "@keystone-6/core/src/types";
import { HairdresserCreator } from "./events/hairdresser";
import {getHour, getTime} from "../lib/date";
import {HolidayHairdresserCreator, HolidayOutletCreator, HolidayValidator} from "./events/holiday";

export class EventCreator {
    data = [
        //linda
        {
            venue: 'maddison_poole',
            day: 'tuesday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'linda',
            duration: 30,
            breakTime: 5
        },
        {
            venue: 'maddison_poole',
            day: 'wednesday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'linda',
            duration: 30,
            breakTime: 5
        },
        {
            venue: 'maddison_poole',
            day: 'thursday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'linda',
            duration: 30,
            breakTime: 5
        },
        {
            venue: 'maddison_poole',
            day: 'saturday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'linda',
            duration: 30,
            breakTime: 5
        },
        // paul
        {
            venue: 'maddison_poole',
            day: 'tuesday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'paul',
            duration: 30,
            breakTime: 5
        },
        {
            venue: 'maddison_poole',
            day: 'wednesday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'paul',
            duration: 30,
            breakTime: 15
        },
        {
            venue: 'maddison_poole',
            day: 'thursday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'paul',
            duration: 30,
            breakTime: 15
        },
        {
            venue: 'maddison_poole',
            day: 'saturday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'paul',
            duration: 30,
            breakTime: 15
        },
        //charlotte
        {
            venue: 'maddison_poole',
            day: 'tuesday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'charlotte',
            duration: 30,
            breakTime: 5
        },
        {
            venue: 'maddison_poole',
            day: 'wednesday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'charlotte',
            duration: 30,
            breakTime: 15
        },
        {
            venue: 'maddison_poole',
            day: 'thursday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'charlotte',
            duration: 30,
            breakTime: 15
        },
        {
            venue: 'maddison_poole',
            day: 'saturday',
            startTime: '9:00',
            endTime: '17:00',
            status: 'open',
            hairdresser: 'charlotte',
            duration: 30,
            breakTime: 15
        },
        //carlos
        {
            venue: 'maddison_poole',
            day: 'tuesday',
            startTime: '18:00',
            endTime: '21:00',
            status: 'open',
            hairdresser: 'carlos',
            duration: 30,
            breakTime: 5
        },
        {
            venue: 'maddison_poole',
            day: 'saturday',
            startTime: '9:00',
            endTime: '12:00',
            status: 'open',
            hairdresser: 'carlos',
            duration: 30,
            breakTime: 15
        }
    ];

    private venueCreator: VenueCreator
    private venueHolidayCreator: HolidayOutletCreator
    private haircutTypeCreator: HaircutTypeCreator
    private haircutTypeGroupCreator: HaircutTypeGroupCreator
    private hairdresserCreator: HairdresserCreator
    private dateFinder: DateFinder
    private holidayValidator: HolidayValidator
    private hairdresserHolidayCreator: HolidayHairdresserCreator
    private context

    constructor(context: KeystoneContext) {
        this.context = context
        this.venueCreator = new VenueCreator(context)
        this.venueCreator.createAllVenues()
        this.venueHolidayCreator = new HolidayOutletCreator(context)
        //this.venueHolidayCreator.createAllOutletHolidays()
        this.haircutTypeGroupCreator = new HaircutTypeGroupCreator(context)
        this.holidayValidator = new HolidayValidator(context)
        this.haircutTypeGroupCreator.createAllHaircutGroupTypes()
        this.haircutTypeCreator = new HaircutTypeCreator(context)
        this.haircutTypeCreator.createAllHaircutTypes()
        this.hairdresserCreator = new HairdresserCreator(context)
        //this.hairdresserCreator.createAllHairdresser()
        this.hairdresserHolidayCreator = new HolidayHairdresserCreator(context)
        //this.hairdresserHolidayCreator.createAllHairdresserHolidays()
        this.dateFinder = new DateFinder()
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
