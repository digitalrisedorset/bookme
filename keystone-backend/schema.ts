import { mergeSchemas } from '@graphql-tools/schema'
import type { GraphQLSchema } from 'graphql'
import type { Lists } from '.keystone/types'
import {User} from "./schemas/User";
import {OutletHoliday} from "./schemas/OutletHoliday";
import {Venue} from "./schemas/Venue";
import {HaircutType} from "./schemas/HaircutType";
import {Event} from "./schemas/Event";
import {CartItem} from "./schemas/CartItem";
import addToCart from "./mutations/addToCart";
import {Order} from "./schemas/Order";
import {OrderItem} from "./schemas/OrderItem";
import checkout from "./mutations/checkout";
import {Hairdresser} from "./schemas/Hairdresser";
import calculatePrice from "./mutations/calculatePrice";
import calculateEventDuration from "./mutations/calculateEventDuration"
import {HaircutTypeGroup} from "./schemas/HaircutTypeGroup";
import {HaircutTypeDuration} from "./schemas/HaircutTypeDuration";
import {Holiday} from "./schemas/Holiday";
import updateEventAndRemoveOverlappingEvent from "./mutations/removeOverlappingEvent";
import {Role} from "./schemas/Role";
import venueHaircutTypeGroups from "./mutations/venueHaircutTypeGroups";

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
    HaircutType,
    HaircutTypeGroup,
    HaircutTypeDuration,
    Hairdresser,
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
             haircutId: ID!            
          ): String
          """ Register a payment token and create the associated order"""
          checkout(
            token: String!
          ): Order    
          """ Remove events from the system that overlaps and have the same hairdresser assigned with an event id """
          updateEventAndRemoveOverlappingEvent(           
            eventId: ID! 
            endTime: String
          ): String    
        }
        type Query {
          """ Calculate price for a haircut, shampoo and hairdresser seniority"""
          calculatePrice(
            haircutId: ID! 
            shampoo: Int
            eventId: ID! 
          ): Int
          """ Calculate duration needed for a haircut, shampoo and hairdresser seniority"""
          calculateEventDuration(
            haircutId: ID! 
            shampoo: Int
            eventId: ID! 
          ): String      
          """ Retrieve all HaircutTypeGroups that have some HaircutType assigned"""
          venueHaircutTypeGroups(
            venueId: ID!           
          ): [HaircutTypeGroup!]        
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
                venueHaircutTypeGroups
            }
        },
    })
}