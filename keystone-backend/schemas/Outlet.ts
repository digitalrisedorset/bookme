import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";

export const Outlet = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'address'],
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
        address: text({
            access: allowAll,
            isFilterable: true,
            isOrderable: false,
            validation: {
                isRequired: false,
            },
        }),
    }
})