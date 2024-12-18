import {list} from "@keystone-6/core";
import {allowAll, denyAll} from "@keystone-6/core/access";
import {password, text, checkbox, select, relationship, calendarDay, integer} from "@keystone-6/core/fields";
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
            initialColumns: ['name', 'phone_number', 'email'],
        },
    },
    fields: {
        name: text({
            access: {
                // only the respective user, or an admin can read this field
                read: isAdminOrSameUser,

                // only admins can update this field
                update: isAdmin,
            },
            isFilterable: false,
            isOrderable: false
        }),
        email: text({
            access: {
                // only the respective user, or an admin can read this field
                read: isAdminOrSameUser,

                // only admins can update this field
                update: isAdmin,
            },
            isFilterable: false,
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
            access: {
                // only the respective user, or an admin can read this field
                read: isAdminOrSameUser,

                // only admins can update this field
                update: isAdmin,
            },
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
        }),
        orders: relationship({ ref: 'Order.user', many: true }),
        // a flag to indicate if this user is an admin
        //  should not be publicly visible
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
    }
})