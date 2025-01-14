import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text, timestamp} from "@keystone-6/core/fields";
import {Venue} from "./Venue";

export const OutletHoliday = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'startDate', 'endDate', 'venue'],
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
        startDate: timestamp({
            access: allowAll,
            isFilterable: false,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        endDate: timestamp({
            access: allowAll,
            isFilterable: false,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        venue: relationship({
            ref: 'Venue.holidays'
        })
    }
})