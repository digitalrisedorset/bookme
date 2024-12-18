import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const Venue = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'capacity'],
        },
    },
    fields: {
        name: text({
            access: allowAll,
            isFilterable: true,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        events: relationship({
            ref: 'Event.venue',
            many: true,
        }),
        capacity: integer({
            defaultValue: 50,
            isRequired: true,
        }),
        /*eventType: relationship({
            ref: 'EventType.event',
            many: true,
        }),*/
    }
})