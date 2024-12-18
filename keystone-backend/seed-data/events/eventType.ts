import {EventTypeCode, EventTypeProps} from "../types";
import type {KeystoneContext} from "@keystone-6/core/src/types";

export class EventTypeCreator {
    data = [
        {
            code: 'kyu',
            name: 'Kyu',
            price: 800
        },
        {
            code: 'ninja',
            name: 'Ninjas',
            price: 600
        },
        {
            code: 'adult',
            name: 'Adult / Advanced',
            price: 800
        }];

    private context

    constructor(context: KeystoneContext) {
        this.context = context
    }

    getEventTypeByCode = (code: EventTypeCode): any => {
        const eventTypeName = this.findEventTypeNameByCode(code)

        return this.findEventTypeByEventName(eventTypeName)
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

    findEventTypeByEventName = async (eventName: string) => {
        let events = await this.context.query.EventType.findMany({
            where: { name: { "equals": eventName} },
            query: 'id price',
        })

        const [event] = events

        if (event) {
            return event
        }
    }

    createEventType = async (eventTypeData: EventTypeProps) => {
        const eventTypeInfo = await this.findEventTypeByCode(eventTypeData.code)
        const eventType = await this.findEventTypeByEventName(eventTypeInfo.name)

        if (!eventType) {
            console.log(`👩 Adding new event type: ${eventTypeInfo.name}`)
            await this.context.query.EventType.createOne({
                data: {
                    name: eventTypeInfo.name,
                    price: eventTypeInfo.price
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