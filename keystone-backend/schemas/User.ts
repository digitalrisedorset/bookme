import {list} from "@keystone-6/core";
import {allowAll, denyAll} from "@keystone-6/core/access";
import {password, text, checkbox, relationship, calendarDay, integer} from "@keystone-6/core/fields";
import type {Session} from "../schema";

export function isAdminOrSameUser ({ session }: { session?: Session }) {
    // you need to have a session to do this
    if (!session) return false

    // admins can do anything
    if (session.data.isAdmin) return true
}

export function isAdmin ({ session }: { session?: Session }) {
    // you need to have a session to do this
    if (!session) return false

    // admins can do anything
    if (session.data.isAdmin) return true

    // otherwise, no
    return false
}

export const User = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['name', 'phone_number', 'email', 'role', 'venue'],
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
            isIndexed: 'unique',
            validation: {
                isRequired: true,
            },
        }),
        // the user's password, used as the secret field for authentication
        //   should not be publicly visible
        password: password({
            access: {
                read: denyAll, // TODO: is this required?
                update: isAdminOrSameUser,
            },
            validation: {
                isRequired: true,
            },
            ui: {
                itemView: {
                    // don't show this field if it isn't relevant
                    fieldMode: args => (isAdminOrSameUser(args) ? 'edit' : 'hidden'),
                },
                listView: {
                    fieldMode: 'hidden', // TODO: is this required?
                },
            },
        }),
        phone_number: text({
            access: allowAll,
            isFilterable: false,
            isOrderable: false
        }),
        dob: calendarDay({
            access: allowAll,
            isFilterable: false,
            isOrderable: false
        }),
        credit: integer({
            defaultValue: 0,
            isRequired: false,
        }),
        hairdresser: relationship({
            ref: 'Hairdresser.user',
        }),
        haircutType: relationship({
            ref: 'HaircutType.user',
        }),
        haircutTypeGroup: relationship({
            ref: 'HaircutTypeGroup.user',
        }),
        weekPreference: text({
            isFilterable: false,
            isOrderable: false
        }),
        cartItems: relationship({
            ref: 'CartItem.user',
            many: true,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'read' },
            },
        }),
        events: relationship({
            ref: 'Event.user',
            many: true,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'hidden' },
                listView: { fieldMode: 'hidden' },
            },
        }),
        venue: relationship({
            ref: 'Venue.users',
        }),
        orders: relationship({ ref: 'Order.user', many: true }),
        role: relationship({
            ref: 'Role.assignedTo',
            access: allowAll,
        }),
        isAdmin: checkbox({
            access: {
                // only the respective user, or an admin can read this field
                read: isAdminOrSameUser,

                // only admins can create, or update this field
                create: isAdmin,
                update: isAdmin,
            },
            defaultValue: false,
            ui: {
                // only admins can edit this field
                createView: {
                    fieldMode: args => (isAdmin(args) ? 'edit' : 'hidden'),
                },
                itemView: {
                    fieldMode: args => (isAdmin(args) ? 'edit' : 'read'),
                },
            },
        }),
    },
    hooks: {
        resolveInput: async ({ item, resolvedData, context }) => {
            const venue = resolvedData?.venue?.connect?.id || item?.venueId;

            if (venue === null) {
                console.log('No venue exist for the the user')
                return resolvedData;
            }

            if (context.query.HaircutTypeGroup === undefined) {
                console.log('No haircutTypeGroup exist, we cannot update the user')
                return resolvedData;
            }

            const haircutTypeGroups = await context.query.HaircutTypeGroup.findMany({
                where: { venue: { id: { "equals": venue} }},
                query: 'id'
            });

            if (haircutTypeGroups && haircutTypeGroups.length === 1) {
                resolvedData.haircutTypeGroup = { connect: { id: haircutTypeGroups[0].id} }
            }

            return resolvedData;
        },
    }
})