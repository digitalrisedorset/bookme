import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, select, timestamp} from "@keystone-6/core/fields";

export const Event = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'hairdresser', 'day', 'startTime', 'endTime'],
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
        price: integer({
            validation: {
                isRequired: true,
            }
        }),
        status: select({
            type: 'enum',
            options: [
                { label: 'Open', value: 'open' },
                { label: 'Started', value: 'started' },
                { label: 'Complete', value: 'complete' },
                { label: 'Missed', value: 'missed' },
            ],
            defaultValue: 'open'
        }),
        venue: relationship({
            ref: 'Venue.events',
        }),
        hairdresser: relationship({
            ref: 'Hairdresser.event',
        }),
        orderItem: relationship({
            ref: 'OrderItem.event',
        }),
        user: relationship({
            ref: 'User.events',
            defaultValue: ({ context }) => ({
                connect: { id: context.session.itemId },
            }),
        })
    }
})