import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text} from "@keystone-6/core/fields";

export const CartItem = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'event', 'eventType', 'shampoo', 'quantity', 'price', 'user'],
        },
    },
    fields: {
        quantity: integer({
            defaultValue: 1,
            isRequired: true,
        }),
        shampoo: integer({
            defaultValue: 1,
            isRequired: true,
        }),
        price: integer(),
        eventType: relationship({ ref: 'EventType' }),
        event: relationship({ ref: 'Event' }),
        user: relationship({ ref: 'User.cartItems' })
    }
})