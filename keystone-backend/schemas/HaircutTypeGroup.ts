import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const HaircutTypeGroup = list({
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
            isOrderable: true,
            validation: {
                isRequired: true,
            },
        }),
        haircuts: relationship({
            ref: 'HaircutType.group',
            many: true,
        }),
        user: relationship({ ref: 'User.haircutTypeGroup' })
    }
})