import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, select, timestamp} from "@keystone-6/core/fields";

export const Event = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'eventHost', 'day', 'startTime', 'endTime', 'status'],
        },
    },
    fields: {
        day: select({
            access: allowAll,
            isFilterable: true,
            isOrderable: false,
            type: 'enum',
            options: [
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
                { label: 'Sunday', value: 'sunday' },
            ],
        }),
        startTime: timestamp({
            access: allowAll,
            isFilterable: true,
            isOrderable: true,
            validation: {
                isRequired: true,
            },
        }),
        endTime: timestamp({
            access: allowAll,
            isFilterable: true,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        status: select({
            type: 'enum',
            options: [
                { label: 'Open', value: 'open' },
                { label: 'Unavailable', value: 'unavailable' },
                { label: 'Started', value: 'started' },
                { label: 'Complete', value: 'complete' },
                { label: 'Missed', value: 'missed' },
                { label: 'WalkIn', value: 'walkin' },
            ],
            defaultValue: 'open'
        }),
        venue: relationship({
            isFilterable: true,
            ref: 'Venue.events',
        }),
        eventHost: relationship({
            ref: 'EventHost.event',
        }),
        orderItem: relationship({
            ref: 'OrderItem.event',
        }),
        user: relationship({
            ref: 'User.events',
            defaultValue: ({ context }) => ({
                connect: { id: context.session.itemId },
            }),
        }),
        pictures: relationship({
            ref: 'EventMedia.event',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['image', 'altText'],
                inlineCreate: { fields: ['image', 'altText'] },
                inlineEdit: { fields: ['image', 'altText'] },
            },
        }),
    }
})