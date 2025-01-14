import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text, timestamp} from "@keystone-6/core/fields";

export const Order = list({
    access: allowAll,
    fields: {
        orderNumber: integer({
            defaultValue: 0,
            validation: {
                isRequired: true,
            },
            isIndexed: 'unique',
        }),
        total: integer(),
        items: relationship({ ref: 'OrderItem.order', many: true }),
        user: relationship({ ref: 'User.orders' }),
        charge: text(),
        createdAt: timestamp({
            access: allowAll,
            defaultValue: { kind: 'now' },
            isFilterable: true,
            isOrderable: true
        }),
    },
})