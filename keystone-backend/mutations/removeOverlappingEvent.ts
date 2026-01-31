/* eslint-disable */
import type { Context } from '.keystone/types'
import type {Session} from "../schema";

async function updateEventAndRemoveOverlappingEvent(
    root: any,
    { eventId, endTime, userId }: { eventId: String, endTime: String, userId: String },
    context: Context
): Promise<string> {
    if (!userId) {
        throw new Error('You must be logged in to do this!');
    }

    const event = await context.query.Event.updateOne({
        where: {id: eventId},
        data: {endTime},
        query: 'id startTime endTime eventHost { id }'
    })

    const events = await context.query.Event.findMany({
        where: {
            startTime: { "lte": event.endTime },
            endTime: { "gte": event.startTime },
            eventHost: { "id": { "equals": event.eventHost.id} },
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