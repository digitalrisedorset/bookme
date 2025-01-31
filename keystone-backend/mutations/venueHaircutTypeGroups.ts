/* eslint-disable */
import type { Context } from '.keystone/types'
import {HaircutTypeGroup} from "../schemas/HaircutTypeGroup";

async function venueHaircutTypeGroups(
    root: any,
    { venueId }: { venueId: string },
    context: Context
): Promise<[HaircutTypeGroup!]> {
    // 1. Query the current user see if they are signed in
    const sesh = context.session as Session;
    if (!sesh.itemId) {
        throw new Error('You must be logged in to do this!');
    }

    const haircutTypeGroups = await context.query.HaircutTypeGroup.findMany({
        where: {
            venue: { id: {"equals": venueId }},
            haircuts: { some: {} }
        },
        query: 'id name',
        orderBy: [
            {
                name: 'asc',
            }
        ],
        resolveFields: false,
    });

    return haircutTypeGroups
}

export default venueHaircutTypeGroups;