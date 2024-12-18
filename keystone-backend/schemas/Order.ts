import {list} from "@keystone-6/core";
import formatMoney from '../lib/formatMoney';
import {isSignedIn} from "../access";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text, virtual} from "@keystone-6/core/fields";

export const Order = list({
    access: allowAll,
    fields: {
        /*label: virtual({
            graphQLReturnType: 'String',
            resolver(item) {
                return `${formatMoney(item.total)}`;
            },
        }),*/
        total: integer(),
        items: relationship({ ref: 'OrderItem.order', many: true }),
        user: relationship({ ref: 'User.orders' }),
        charge: text(),
    },
})