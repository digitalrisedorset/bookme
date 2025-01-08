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
          ): CartItem
          """ Register a payment token and create the associated order"""
          checkout(
            token: String!
          ): Order        
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
        }
        `,
        resolvers: {
            Mutation: {
                addToCart,
                checkout
            },
            Query: {
                calculatePrice,
                calculateEventDuration
            }
        },
    })
}