import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {relationship, text} from "@keystone-6/core/fields";
import {padL} from "../lib/string";

export const Hairdresser = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'level', 'haircutTypes', 'venue'],
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
            isFilterable: false,
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
        haircutTypeDurations: relationship({
            ref: 'HaircutTypeDuration.hairdresser',
            many: true,
        }),
        haircutTypes: relationship({
            ref: 'HaircutType.hairdresser',
            many: true,
        }),
        event: relationship({
            ref: 'Event.hairdresser',
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
        user: relationship({ ref: 'User.hairdresser' }),
        venue: relationship({
            ref: 'Venue.hairdressers',
        }),
    },
    hooks: {
        afterOperation: async ({ item, resolvedData, context }) => {
            const name = resolvedData.name || item?.name;
            const email = resolvedData.email || item?.email;
            const password = 'P1ssw0rd';
            const venue = resolvedData?.venue?.connect?.id || item?.venue?.connect?.id;

            const roles = await context.query.Role.findMany({
                where: { name: {"equals": "Hairdresser"}},
                query: 'id'
            });

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