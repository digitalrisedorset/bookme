/* eslint-disable */
import type { Context } from '.keystone/types'
import type {Session} from "../schema";

async function updateEventAndRemoveOverlappingEvent(
    root: any,
    { eventId, endTime }: { eventId: String, endTime: String },
    context: Context
): Promise<string> {
    const sesh = context.session as Session;
    if (!sesh.itemId) {
        throw new Error('You must be logged in to do this!');
    }

    const event = await context.query.Event.updateOne({
        where: {id: eventId},
        data: {endTime},
        query: 'id startTime endTime hairdresser { id }'
    })

    const events = await context.query.Event.findMany({
        where: {
            startTime: { "lte": event.endTime },
            endTime: { "gte": event.startTime },
            hairdresser: { "id": { "equals": event.hairdresser.id} },
            id: {"notIn": [event.id] }
        },
        query: 'id startTime endTime'
    });

    let eventIds = []
    for (let i=0;i<events.length;i++) {
        eventIds.push({id: events[i].id})
    }

    if (eventIds.length>0) {
        await context.query.Event.deleteMany({ where: eventIds });
        return events.map((event) => event.id).join(',')
    }

    return ''
}

export default updateEventAndRemoveOverlappingEvent;