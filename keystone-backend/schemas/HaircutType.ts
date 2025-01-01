import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const HaircutType = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'base_price'],
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
        hairdresser: relationship({
            ref: 'Hairdresser.haircutTypes',
            many: true,
        }),
        base_price: integer({
            validation: {
                isRequired: true,
            },
        }),
        user: relationship({ ref: 'User.haircutType' })
    }
})