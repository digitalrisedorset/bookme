import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";

export const Venue = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name'],
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
        holidays: relationship({
            ref: 'OutletHoliday.venue',
            many: true,
        })
    }
})