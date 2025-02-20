import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const EventTypeDuration = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name'],
        },
    },
    fields: {
        duration: integer({
            access: allowAll,
            isFilterable: false,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        eventType: relationship({
            ref: 'EventType.eventHostDuration',
        }),
        eventHost: relationship({ ref: 'EventHost.eventTypeDurations' })
    }
})