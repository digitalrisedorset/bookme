import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const EventType = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'base_price', 'group', 'duration', 'breakTime'],
        },
    },
    fields: {
        name: text({
            access: allowAll,
            isFilterable: true,
            isOrderable: true,
            validation: {
                isRequired: true,
            },
        }),
        code: text({
            access: allowAll,
            isFilterable: true,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        duration: integer({
            validation: {
                isRequired: true,
            },
        }),
        breakTime: integer({
            defaultValue: 5,
            validation: {
                isRequired: true,
            },
        }),
        eventHostDuration: relationship({
            ref: 'EventTypeDuration.eventType',
            many: true,
        }),
        group: relationship({
            ref: 'EventTypeGroup.eventTypes',
        }),
        eventHost: relationship({
            ref: 'EventHost.eventTypes',
            many: true,
        }),
        base_price: integer({
            validation: {
                isRequired: true,
            },
        }),
        user: relationship({ ref: 'User.eventType' })
    }
})