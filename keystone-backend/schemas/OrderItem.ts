import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const OrderItem = list({
    access: allowAll,
    fields: {
        name: text({ isRequired: true }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        price: integer(),
        quantity: integer(),
        order: relationship({ ref: 'Order.items' }),
    },
});