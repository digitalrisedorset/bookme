/* eslint-disable */
import type { Context } from '.keystone/types'
import {EventTypeGroup} from "../schemas/EventTypeGroup";

async function venueEventTypeGroups(
    root: any,
    { venueId }: { venueId: string },
    context: Context
): Promise<[EventTypeGroup!]> {
    // 1. Query the current user see if they are signed in
    const sesh = context.session as Session;
    if (!sesh.itemId) {
        throw new Error('You must be logged in to do this!');
    }

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