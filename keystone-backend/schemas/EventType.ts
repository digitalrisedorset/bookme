import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const EventType = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'price'],
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
        event: relationship({
            ref: 'Event.eventType',
            many: true,
        }),
        price: integer({
            validation: {
                isRequired: true,
            },
        }),
    }
})