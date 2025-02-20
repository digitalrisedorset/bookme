import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";

export const EventHost = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'level', 'eventTypes', 'venue', 'user'],
        },
    },
    fields: {
        name: text({
            access: allowAll,
            isFilterable: true,
            isOrderable: false
        }),
        email: text({
            access: allowAll,
            isFilterable: true,
            isOrderable: false,
            /*isIndexed: 'unique',*/
            validation: {
                isRequired: true,
            },
        }),
        level: text({
            isFilterable: true,
            validation: {
                isRequired: true,
            },
        }),
        eventTypeDurations: relationship({
            ref: 'EventTypeDuration.eventHost',
            many: true,
        }),
        eventTypes: relationship({
            ref: 'EventType.eventHost',
            many: true,
        }),
        event: relationship({
            ref: 'Event.eventHost',
            many: true,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'hidden' },
                listView: { fieldMode: 'hidden' },
            },
        }),
        holidays: relationship({
            ref: 'Holiday.staff',
            many: true,
        }),
        user: relationship({ ref: 'User.eventHost' }),
        venue: relationship({
            ref: 'Venue.eventHosts',
        }),
    },
    hooks: {
        afterOperation: async ({ item, resolvedData, context }) => {
            const name = resolvedData.name || item?.name;
            const email = resolvedData.email || item?.email;
            const password = 'P1ssw0rd';
            const venue = resolvedData?.venue?.connect?.id || item?.venue?.connect?.id;

            if (context.query.Role === undefined) {
                console.log('No Role exist, we cannot update the EventHost')
                return resolvedData;
            }

            const roles = await context.query.Role.findMany({
                where: { name: {"equals": "EventHost"}},
                query: 'id'
            });

            if (roles?.length === 0) {
                console.log('No Role was created, we cannot update the EventHost')
                return resolvedData;
            }

            const [customerRole] = roles

            const user = await context.query.User.createOne({
                data: {
                    name,
                    email,
                    password,
                    venue:  { connect: { id: venue } },
                    role:  { connect: { id: customerRole.id } }
                },
                resolveFields: false,
            });
        },
    }
})