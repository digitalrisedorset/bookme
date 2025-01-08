import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const HaircutTypeDuration = list({
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
        haircutType: relationship({
            ref: 'HaircutType.hairdresserDuration',
        }),
        hairdresser: relationship({ ref: 'Hairdresser.haircutTypeDurations' })
    }
})