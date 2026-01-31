import { mergeSchemas } from '@graphql-tools/schema'
import type { GraphQLSchema } from 'graphql'
import type { Lists } from '.keystone/types'
import {User} from "./schemas/User";
import {OutletHoliday} from "./schemas/OutletHoliday";
import {Venue} from "./schemas/Venue";
import {EventType} from "./schemas/EventType";
import {Event} from "./schemas/Event";
import {CartItem} from "./schemas/CartItem";
import addToCart from "./mutations/addToCart";
import {Order} from "./schemas/Order";
import {OrderItem} from "./schemas/OrderItem";
import checkout from "./mutations/checkout";
import {EventHost} from "./schemas/EventHost";
import calculatePrice from "./mutations/calculatePrice";
import calculateEventDuration from "./mutations/calculateEventDuration"
import {EventTypeGroup} from "./schemas/EventTypeGroup";
import {EventTypeDuration} from "./schemas/EventTypeDuration";
import {Holiday} from "./schemas/Holiday";
import updateEventAndRemoveOverlappingEvent from "./mutations/removeOverlappingEvent";
import {Role} from "./schemas/Role";
import venueEventTypeGroups from "./mutations/venueEventTypeGroups";
import {EventMedia} from "./schemas/EventMedia";
import {graphql} from "@keystone-6/core";

export type Session = {
    itemId: string
    data: {
        isAdmin: boolean
    }
}

export const lists = {
    CartItem,
    OutletHoliday,
    Event,
    EventMedia,
    EventType: EventType,
    EventTypeGroup,
    EventTypeDuration,
    EventHost: EventHost,
    Holiday,
    Role,
    Venue,
    User,
    Order,
    OrderItem
} satisfies Lists

export const extendGraphqlSchema = graphql.extend(base => ({
    mutation: {
        upsertUser: graphql.field({
            type: base.object('User'),
            args: {
                email: graphql.arg({type: graphql.nonNull(graphql.String)}),
                name: graphql.arg({type: graphql.String}),
                provider: graphql.arg({type: graphql.String}),
            },
            async resolve(root, {email, name, provider}, context) {
                const existing = await context.db.User.findOne({where: {email}});

                if (existing) {
                    return await context.db.User.updateOne({
                        where: {id: existing.id},
                        data: {
                            name,
                            provider,
                        },
                    });
                }

                return await context.db.User.createOne({
                    data: {
                        email,
                        name,
                        provider,
                    },
                });
            }
        }),
        addToCart: graphql.field({
            type: graphql.String,
            description: 'Add an event to the cart of the logged-in user',
            args: {
                eventId: graphql.arg({ type: graphql.nonNull(graphql.ID) }),
                shampoo: graphql.arg({ type: graphql.Int }),
                eventTypeId: graphql.arg({ type: graphql.nonNull(graphql.ID) }),
                userId: graphql.arg({ type: graphql.nonNull(graphql.ID) }),
                turnstileToken: graphql.arg({
                    type: graphql.nonNull(graphql.String),
                }),
            },
            async resolve(root, args, context) {
                return addToCart(root, args, context);
            },
        }),

        checkout: graphql.field({
            type: base.object('Order'),
            description: 'Register a payment token and create the associated order',
            args: {
                token: graphql.arg({
                    type: graphql.nonNull(graphql.String),
                }),
            },
            async resolve(root, args, context) {
                return checkout(root, args, context);
            },
        }),

        updateEventAndRemoveOverlappingEvent: graphql.field({
            type: graphql.String,
            description:
                'Remove overlapping events assigned to the same event host',
            args: {
                eventId: graphql.arg({
                    type: graphql.nonNull(graphql.ID),
                }),
                endTime: graphql.arg({
                    type: graphql.String,
                }),
            },
            async resolve(root, args, context) {
                return updateEventAndRemoveOverlappingEvent(root, args, context);
            },
        }),
    },

    query: {
        calculatePrice: graphql.field({
            type: graphql.Int,
            description:
                'Calculate price for an eventType, shampoo and eventHost seniority',
            args: {
                eventTypeId: graphql.arg({
                    type: graphql.nonNull(graphql.ID),
                }),
                shampoo: graphql.arg({ type: graphql.Int }),
                eventId: graphql.arg({
                    type: graphql.nonNull(graphql.ID),
                }),
            },
            async resolve(root, args, context) {
                return calculatePrice(root, args, context);
            },
        }),

        calculateEventDuration: graphql.field({
            type: graphql.String,
            description:
                'Calculate duration needed for an eventType, shampoo and eventHost seniority',
            args: {
                eventTypeId: graphql.arg({
                    type: graphql.nonNull(graphql.ID),
                }),
                shampoo: graphql.arg({ type: graphql.Int }),
                eventId: graphql.arg({
                    type: graphql.nonNull(graphql.ID),
                }),
            },
            async resolve(root, args, context) {
                return calculateEventDuration(root, args, context);
            },
        }),

        venueEventTypeGroups: graphql.field({
            type: graphql.list(
                graphql.nonNull(base.object('EventTypeGroup'))
            ),
            description:
                'Retrieve all EventTypeGroups that have some EventType assigned',
            args: {
                venueId: graphql.arg({
                    type: graphql.nonNull(graphql.ID),
                }),
            },
            async resolve(root, args, context) {
                return venueEventTypeGroups(root, args, context);
            },
        }),
    },
}));