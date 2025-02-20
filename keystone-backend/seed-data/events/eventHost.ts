import type {KeystoneContext} from "@keystone-6/core/src/types";
import {EventTypeGroupCode, EventHostCode, EventHostProps} from "../types";
import {EventTypeGroupCreator} from "./eventTypeGroup";
import {EventTypeCreator} from "./eventType";
import {flatten} from "../../lib/array";
import {eventHost} from "../sample-data/eventHost";
import {VenueCreator} from "./venue";
import {EventHostRepair} from "./EventHost/repair";

export class EventHostCreator {
    private context

    private eventTypeGroupCreator: EventTypeGroupCreator

    private eventTypeCreator: EventTypeCreator

    private data: EventHostProps[]

    private venueCreator: VenueCreator

    private eventHostRepair: EventHostRepair

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = eventHost
        this.eventTypeGroupCreator = new EventTypeGroupCreator(context)
        this.eventTypeCreator = new EventTypeCreator(context)
        this.venueCreator = new VenueCreator(context)
        this.eventHostRepair = new EventHostRepair(context)
    }

    findVenueByCode = (code: string) => {
        return this.venueCreator.getVenueByCode(code)
    }

    getEventHostByCode = (code: EventHostCode): any => {
        const eventTypeName = this.findEventHostNameByCode(code)

        return this.findEventHostByEventHostName(eventTypeName)
    }

    findEventHostNameByCode = (code: EventHostCode): string => {
        const eventTypeName = this.data.reduce((name, eventType) => {
            return (eventType.code === code)?eventType.name: name
        }, '')

        return eventTypeName
    }

    findEventHostByCode = (code: EventHostCode): string => {
        const eventHostData = this.data.filter((eventType) => {
            if (eventType.code === code) return eventType
        })

        if (eventHostData) {
            return eventHostData[0]
        }
    }

    findEventHostByEventHostName = async (name: string) => {
        let records = await this.context.query.EventHost.findMany({
            where: { name: { "equals": name} },
            query: 'id level name',
        })

        const [result] = records

        if (result) {
            return result
        }
    }

    getEventTypesGroupByGroupCodes = async (codes: EventTypeGroupCode[]): any => {
        const groups = await Promise.all(codes.map(async (code:string) => {
            return await this.eventTypeGroupCreator.getEventTypeGroupByCode(code)
        }, this))

        return groups
    }

    buildEmail = (eventHostData: EventHostProps) => {
        return `${eventHostData.name.toLowerCase()}@${eventHostData.venue}.com`
    }

    createEventHost = async (eventHostData: EventHostProps) => {
        const eventHostInfo = await this.findEventHostByCode(eventHostData.code)
        const eventHost = await this.findEventHostByEventHostName(eventHostInfo.name)
        const venue = await this.findVenueByCode(eventHostInfo.venue)

        if (!eventHost) {
            console.log(`👩 Adding new eventHost: ${eventHostInfo.name}`, {
                name: eventHostInfo.name,
                level: eventHostInfo.level
            })
            const eventHost = await this.context.query.EventHost.createOne({
                data: {
                    name: eventHostInfo.name,
                    email: this.buildEmail(eventHostInfo),
                    level: eventHostInfo.level,
                    venue: { connect: { id: venue.id}},
                },
                query: 'id',
            })
        }

        if (eventHost) {
            const eventTypeGroups = await this.getEventTypesGroupByGroupCodes(eventHostData.eventTypeSpeciality)

            const eventTypes = flatten(await Promise.all(eventTypeGroups.map(async (eventTypeGroup: any) => {
                return await this.eventTypeCreator.getEventTypesByGroupId(eventTypeGroup.id)
            }, this)))

            await Promise.all(eventTypes.map(async (eventType: any) => {
                await this.context.query.EventType.updateOne({
                    where: {id: eventType.id},
                    data: {
                        eventHost: { connect: { id: eventHost.id}},
                    },
                    query: 'id',
                })
            }, this))
        }
    }

    createAllEventHost = async () => {
        for (const eventHost: EventHostProps of this.data) {
            await this.createEventHost(eventHost)
        }
    }

    repairEventHost = async () => {
        for (const eventHost: EventHostProps of this.data) {
            await this.eventHostRepair.repair(eventHost.name, eventHost.venue)
        }
    }
}