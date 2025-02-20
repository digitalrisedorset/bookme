import {EventTypeCode, EventTypeProps} from "../types";
import type {KeystoneContext} from "@keystone-6/core/src/types";
import {EventTypeGroupCreator} from "./eventTypeGroup";
import {eventType} from "../sample-data/eventType";

export class EventTypeCreator {
    private context

    private eventTypeGroupCreator: EventTypeGroupCreator

    private data: EventTypeProps[]

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = eventType
        this.eventTypeGroupCreator = new EventTypeGroupCreator(context)
    }

    getEventTypeByCode = async (code: EventTypeCode): any => {
        const eventTypes = await this.context.query.EventType.findMany({
            where: { code: { "equals": code } },
            query: 'id name',
        })

        const [eventType] = eventTypes

        if (eventType) {
            return eventType
        }
    }

    findEventTypeNameByCode = (code: EventTypeCode): string => {
        const eventTypeName = this.data.reduce((name, eventType) => {
            return (eventType.code === code)?eventType.name: name
        }, '')

        return eventTypeName
    }

    findEventTypeByCode = (code: EventTypeCode): string => {
        const eventType = this.data.filter((eventType) => {
            if (eventType.code === code) return eventType
        })

        if (eventType) {
            return eventType[0]
        }
    }

    getEventTypesByGroupId = async (groupId: string) => {
        const eventTypes = await this.context.query.EventType.findMany({
            where: { group: { "id": { "equals": groupId}} },
            query: 'id',
        })

        return eventTypes
    }

    findEventTypeByHaircutName = async (eventTypeName: string) => {
        const eventTypes = await this.context.query.EventType.findMany({
            where: { name: { "equals": eventTypeName} },
            query: 'id base_price',
        })

        const [eventType] = eventTypes

        if (eventType) {
            return eventType
        }
    }

    createEventType = async (eventTypeData: EventTypeProps) => {
        const eventTypeInfo = await this.findEventTypeByCode(eventTypeData.code)
        const eventType = await this.getEventTypeByCode(eventTypeInfo.code)
        const eventTypeGroup = await this.eventTypeGroupCreator.getEventTypeGroupByCode(eventTypeInfo.category)

        if (!eventType) {
            console.log(`👩 Adding new eventType type: ${eventTypeInfo.name}`)
            await this.context.query.EventType.createOne({
                data: {
                    name: eventTypeInfo.name,
                    code: eventTypeInfo.code,
                    base_price: eventTypeInfo.price,
                    duration: eventTypeInfo.duration,
                    group: { connect: { id: eventTypeGroup.id}},
                },
                query: 'id',
            })
        }
    }

    createAllEventTypes = async () => {
        for (const eventType: EventTypeProps of this.data) {
            await this.createEventType(eventType)
        }
    }

}