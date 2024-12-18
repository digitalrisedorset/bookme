import {EventProps} from "./types";
import {VenueCreator} from "./events/venue";
import {EventTypeCreator} from "./events/eventType";
import {DateFinder} from "./events/dateFinder";
import type {KeystoneContext} from "@keystone-6/core/src/types";

export class EventCreator {
    data = [
        {
            venue: 'bourne',
            day: 'tuesday',
            startTime: '17:45',
            endTime: '19:00',
            status: 'open',
            eventType: 'kyu'
        },
        {
            venue: 'bourne',
            day: 'tuesday',
            startTime: '18:45',
            endTime: '20:00',
            status: 'open',
            eventType: 'adult'
        },
        {
            venue: 'winton',
            day: 'wednesday',
            startTime: '17:15',
            endTime: '18:00',
            status: 'open',
            eventType: 'ninja'
        },
        {
            venue: 'winton',
            day: 'wednesday',
            startTime: '18:00',
            endTime: '19:00',
            status: 'open',
            eventType: 'kyu'
        },
        {
            venue: 'winton',
            day: 'wednesday',
            startTime: '18:00',
            endTime: '19:00',
            status: 'open',
            eventType: 'adult'
        },
        {
            venue: 'poole',
            day: 'wednesday',
            startTime: '17:00',
            endTime: '17:45',
            status: 'open',
            eventType: 'ninja'
        },
        {
            venue: 'poole',
            day: 'wednesday',
            startTime: '17:45',
            endTime: '19:00',
            status: 'open',
            eventType: 'kyu'
        },
        {
            venue: 'poole',
            day: 'wednesday',
            startTime: '17:00',
            endTime: '16:00',
            status: 'open',
            eventType: 'adult'
        },
        {
            venue: 'alderney',
            day: 'thursday',
            startTime: '16:30',
            endTime: '17:15',
            status: 'open',
            eventType: 'ninja'
        },
        {
            venue: 'alderney',
            day: 'thursday',
            startTime: '17:15',
            endTime: '18:15',
            status: 'open',
            eventType: 'kyu'
        },
        {
            venue: 'alderney',
            day: 'thursday',
            startTime: '18:15',
            endTime: '19:15',
            status: 'open',
            eventType: 'kyu'
        },
        {
            venue: 'muscliff',
            day: 'saturday',
            startTime: '09:15',
            endTime: '10:00',
            status: 'open',
            eventType: 'ninja'
        },
        {
            venue: 'muscliff',
            day: 'saturday',
            startTime: '10:00',
            endTime: '11:15',
            status: 'open',
            eventType: 'kyu'
        },
        {
            venue: 'muscliff',
            day: 'saturday',
            startTime: '11:00',
            endTime: '12:30',
            status: 'open',
            eventType: 'adult'
        },
        {
            venue: 'hamworthy',
            day: 'saturday',
            startTime: '09:30',
            endTime: '10:15',
            status: 'open',
            eventType: 'ninja'
        },
        {
            venue: 'hamworthy',
            day: 'saturday',
            startTime: '10:15',
            endTime: '11:15',
            status: 'open',
            eventType: 'kyu'
        },
        {
            venue: 'hamworthy',
            day: 'saturday',
            startTime: '11:15',
            endTime: '12:15',
            status: 'open',
            eventType: 'adult'
        },
        {
            venue: 'st_yves',
            day: 'friday',
            startTime: '16:30',
            endTime: '17:15',
            status: 'open',
            eventType: 'ninja'
        },
        {
            venue: 'st_yves',
            day: 'friday',
            startTime: '17:15',
            endTime: '18:15',
            status: 'open',
            eventType: 'kyu'
        },
    ];

    private venueCreator: VenueCreator
    private eventTypeCreator: EventTypeCreator
    private dateFinder: DateFinder
    private context

    constructor(context: KeystoneContext) {
        this.context = context
        this.venueCreator = new VenueCreator(context)
        this.venueCreator.createAllVenues()
        this.eventTypeCreator = new EventTypeCreator(context)
        this.eventTypeCreator.createAllEventTypes()
        this.dateFinder = new DateFinder()
    }

    concatDateTime = (dateDay, dateTime) => {
        return dateDay.concat('T', dateTime, ':00.101Z')
    }

    /*
    eg: 2025-12-17T07:54:37.760Z
     */
    createEvent = async (venueId: string, capacity: number, eventTypeId: string, price: number, eventDate: string, day: string, startTime: string, endTime: string) => {
        console.log('create new event', {
            venueId,
            eventTypeId,
            price,
            capacity,
            eventDate,
            startTime,
            endTime
        })

        //const event = await this.findEventByKey(venue, eventType, eventDate)

        if (venueId!== undefined && eventTypeId!== undefined) {
            await this.context.query.Event.createOne({
                data: {
                    day,
                    maximumAttendees: capacity,
                    price,
                    startTime: this.concatDateTime(eventDate, startTime),
                    endTime: this.concatDateTime(eventDate, endTime),
                    venue: { connect: { id: venueId}},
                    eventType: { connect: { id: eventTypeId}},
                },
                query: 'id',
            })
        }
    }

    createEventForYear = async (event: EventProps) => {
        const venue = await this.venueCreator.getVenueByCode(event.venue)
        const eventType = await this.eventTypeCreator.getEventTypeByCode(event.eventType)

        const eventDates = this.dateFinder.getDatesByDay(event.day, 2025)

        for (let i=0; i < eventDates.length; i++) {
            console.log('event raw data', event)
            this.createEvent(
                venue?.id,
                venue?.capacity,
                eventType?.id,
                eventType?.price,
                eventDates[i],
                event.day,
                event.startTime,
                event.endTime
            )
        }
    }

    createAllEvents = async () => {
        for (const event: EventProps of this.data) {
           await this.createEventForYear(event)
        }
    }
}
