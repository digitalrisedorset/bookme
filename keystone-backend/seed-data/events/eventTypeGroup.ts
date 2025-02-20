import {
    EventTypeGroupCode,
    EventTypeGroupProps
} from "../types";
import type { KeystoneContext } from "@keystone-6/core/src/types";
import {eventTypeGroup} from "../sample-data/eventTypeGroup";
import {VenueCreator} from "./venue";

export class EventTypeGroupCreator {
    private context

    private data: EventTypeGroupProps[]

    private venueCreator: VenueCreator

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = eventTypeGroup
        this.venueCreator = new VenueCreator(context)
    }

    getEventTypeGroupByCode = async (code: EventTypeGroupCode): any => {
        const eventTypeGroups = await this.context.query.EventTypeGroup.findMany({
            where: { code: { "equals": code } },
            query: 'id name',
        })

        const [eventTypeGroup] = eventTypeGroups

        if (eventTypeGroup) {
            return eventTypeGroup
        }
    }

    findEventTypeGroupNameByCode = (code: EventTypeGroupCode): string => {
        const eventTypeGroupName = this.data.reduce((name, eventTypeGroup) => {
            return (eventTypeGroup.code === code) ? eventTypeGroup.name : name
        }, '')

        return eventTypeGroupName
    }

    findEventTypeGroupByCode = (code: EventTypeGroupCode): string => {
        const eventTypeGroup = this.data.filter((eventTypeGroup) => {
            if (eventTypeGroup.code === code) return eventTypeGroup
        })

        if (eventTypeGroup) {
            return eventTypeGroup[0]
        }
    }

    findVenueByCode = (code: string) => {
        return this.venueCreator.getVenueByCode(code)
    }

    findEventTypeGroupByHaircutName = async (eventTypeGroupName: string) => {
        let eventTypeGroups = await this.context.query.EventTypeGroup.findMany({
            where: { name: { "equals": eventTypeGroupName } },
            query: 'id name',
        })

        const [eventTypeGroup] = eventTypeGroups

        if (eventTypeGroup) {
            return eventTypeGroup
        }
    }

    createEventTypeGroup = async (eventTypeGroupData: EventTypeGroupProps) => {
        const eventTypeGroup = await this.getEventTypeGroupByCode(eventTypeGroupData.code)
        const venue = await this.findVenueByCode(eventTypeGroupData.venue)

        if (!eventTypeGroup) {
            console.log(`👩 Adding new eventType type group: ${eventTypeGroupData.name}`)
            await this.context.query.EventTypeGroup.createOne({
                data: {
                    code: eventTypeGroupData.code,
                    name: eventTypeGroupData.name,
                    venue: { connect: { id: venue?.id}},
                },
                query: 'id',
            })
        }
    }

    createAllEventGroupTypes = async () => {
        for (const eventTypeGroup: EventTypeGroupProps of this.data) {
            await this.createEventTypeGroup(eventTypeGroup)
        }
    }

}