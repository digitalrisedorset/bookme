import {list} from "@keystone-6/core";
import {allowAll} from "@keystone-6/core/access";
import {password, text, checkbox, relationship, calendarDay, integer, select} from "@keystone-6/core/fields";
import {keystoneconfig} from '../config'
import {findVenueByCode, findVenueByName} from "../lib/venue";

const commonPasswords = [
    "password", "123456", "123456789", "qwerty", "abc123", "password1", "123123"
];

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
        provider: select({
            options: [
                { label: 'Credentials', value: 'credentials' },
                { label: 'Google', value: 'google' },
                { label: 'Apple', value: 'apple' },
            ],
            defaultValue: 'credentials',
        }),
        // the user's password, used as the secret field for authentication
        //   should not be publicly visible
        password: password({
            hooks: {
                validateInput: async ({ resolvedData, item, addValidationError }) => {
                    const provider = resolvedData.provider ?? item?.provider ?? null;
                    const pwd = resolvedData.password ?? item?.password;

                    if (provider === 'credentials') {
                        if (!pwd) {
                            addValidationError('Password is required for credential-based users.');
                        } else if (pwd.length < 8) {
                            addValidationError('Password must be at least 8 characters long.');
                        }
                    }
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
        eventHost: relationship({
            ref: 'EventHost.user',
        }),
        eventType: relationship({
            ref: 'EventType.user',
        }),
        eventTypeGroup: relationship({
            ref: 'EventTypeGroup.user',
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
            defaultValue: false,
        }),
    },
    hooks: {
        resolveInput: async ({ item, resolvedData, context }) => {
            let venue = resolvedData?.venue?.connect?.id || item?.venueId;

            if (venue === null) {
                venue = findVenueByCode(context, keystoneconfig.defaultVenue)
                resolvedData['venue'] = { connect: { id: venue.id} }
            }

            if (context.query.EventTypeGroup === undefined) {
                console.log('No eventTypeGroup exist, we cannot update the user')
                return resolvedData;
            }

            const eventTypeGroups = await context.query.EventTypeGroup.findMany({
                where: { venue: { id: { "equals": venue} }},
                query: 'id'
            });

            if (eventTypeGroups && eventTypeGroups.length === 1) {
                resolvedData.eventTypeGroup = { connect: { id: eventTypeGroups[0].id} }
            }

            return resolvedData;
        },
    }
})


