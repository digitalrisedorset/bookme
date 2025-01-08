import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const HaircutType = list({
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
        hairdresserDuration: relationship({
            ref: 'HaircutTypeDuration.haircutType',
            many: true,
        }),
        group: relationship({
            ref: 'HaircutTypeGroup.haircuts',
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