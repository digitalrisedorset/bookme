/* eslint-disable */
import type { Context } from '.keystone/types'
import {EventTypeGroup} from "../schemas/EventTypeGroup";

async function venueEventTypeGroups(
    root: any,
    { venueId }: { venueId: string },
    context: Context
): Promise<[EventTypeGroup!]> {
    const eventTypeGroups = await context.query.EventTypeGroup.findMany({
        where: {
            venue: { id: {"equals": venueId }},
            eventTypes: { some: {} }
        },
        query: 'id name',
        orderBy: [
            {
                name: 'asc',
            }
        ],
        resolveFields: false,
    });

    return eventTypeGroups
}

export default venueEventTypeGroups;