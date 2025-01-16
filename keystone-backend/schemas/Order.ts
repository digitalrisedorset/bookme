import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {integer, relationship, text, timestamp} from "@keystone-6/core/fields";
import {padL} from "../lib/string";

export const Order = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'orderReference', 'venue'],
        },
    },
    fields: {
        orderNumber: integer({
            defaultValue: 0,
            validation: {
                isRequired: true,
            }
        }),
        venue: relationship({
            ref: 'Venue.orders',
        }),
        orderReference: text({
            isIndexed: 'unique',
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'read' },
                listView: { fieldMode: 'read' },
            },
            graphql: { omit: ['create', 'update'] },
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
    hooks: {
        resolveInput: async ({ item, resolvedData, context }) => {
            const orderNumber = resolvedData.orderNumber || item?.orderNumber;

            const user = await context.query.User.findOne({
                where: { id: resolvedData?.user?.connect?.id },
                query: `venue {
                    id
                    orderPrefix
                    orderPadding
                }`
            });

            resolvedData['orderReference'] = `${user?.venue.orderPrefix}${padL(orderNumber, user?.venue.orderPadding)}`
            resolvedData['venue'] = { connect: { id: user.venue.id} }

            return resolvedData;
        },
    }
})