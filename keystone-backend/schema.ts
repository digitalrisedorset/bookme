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

export function extendGraphqlSchema (baseSchema: GraphQLSchema) {
    return mergeSchemas({
        schemas: [baseSchema],
        typeDefs: `
        type Mutation {
          """ Add an event to the cart of the logged-in user"""
          addToCart(
             eventId: ID! 
             shampoo: Int
             eventTypeId: ID!            
          ): String
          """ Register a payment token and create the associated order"""
          checkout(
            token: String!
          ): Order    
          """ Remove events from the system that overlaps and have the same eventHost assigned with an event id """
          updateEventAndRemoveOverlappingEvent(           
            eventId: ID! 
            endTime: String
          ): String    
        }
        type Query {
          """ Calculate price for a eventType, shampoo and eventHost seniority"""
          calculatePrice(
            eventTypeId: ID! 
            shampoo: Int
            eventId: ID! 
          ): Int
          """ Calculate duration needed for a eventType, shampoo and eventHost seniority"""
          calculateEventDuration(
            eventTypeId: ID! 
            shampoo: Int
            eventId: ID! 
          ): String      
          """ Retrieve all EventTypeGroups that have some EventType assigned"""
          venueEventTypeGroups(
            venueId: ID!           
          ): [EventTypeGroup!]        
        }
        `,
        resolvers: {
            Mutation: {
                addToCart,
                checkout,
                updateEventAndRemoveOverlappingEvent
            },
            Query: {
                calculatePrice,
                calculateEventDuration,
                venueEventTypeGroups
            }
        },
    })
}