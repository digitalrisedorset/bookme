import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";

export const EventTypeGroup = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'eventTypes', 'venue'],
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
        eventTypes: relationship({
            ref: 'EventType.group',
            many: true,
        }),
        user: relationship({ ref: 'User.eventTypeGroup' }),
        venue: relationship({
            ref: 'Venue.eventTypeGroups',
        }),
    }
})