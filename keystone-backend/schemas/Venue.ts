import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const Venue = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['code', 'name', 'orderPrefix', 'orderPadding'],
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
        code: text({
            access: allowAll,
            isFilterable: true,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        orderPrefix: text({
            access: allowAll,
            isFilterable: false,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        orderPadding: integer({
            access: allowAll,
            isFilterable: false,
            isOrderable: false,
            validation: {
                isRequired: true,
            },
        }),
        events: relationship({
            ref: 'Event.venue',
            many: true,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'hidden' },
                listView: { fieldMode: 'hidden' },
            },
        }),
        holidays: relationship({
            ref: 'OutletHoliday.venue',
            many: true,
        }),
        users: relationship({
            ref: 'User.venue',
            many: true,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'hidden' },
                listView: { fieldMode: 'hidden' },
            },
        }),
        orders: relationship({
            ref: 'Order.venue',
            many: true,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'hidden' },
                listView: { fieldMode: 'hidden' },
            },
        }),
        hairdressers: relationship({
            ref: 'Hairdresser.venue',
            many: true,
        }),
        haircutTypeGroups: relationship({
            ref: 'HaircutTypeGroup.venue',
            many: true,
        }),
    }
})