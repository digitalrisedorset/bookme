import type {KeystoneContext} from "@keystone-6/core/src/types";
import {EventHost} from "../../../schemas/EventHost";
const graphql = String.raw;

export class EventHostRepair {
    private context

    constructor(context: KeystoneContext) {
        this.context = context
    }

    buildEmail = (name: string, venue: string) => {
        return `${name.toLowerCase()}@${venue}.com`
    }

    findEventHostByEmail = async (email: string) => {
        let records = await this.context.query.EventHost.findMany({
            where: { email: { "equals": email } },
            query: 'id email name venue { id }',
        })

        const [result] = records

        if (result) {
            return result
        }
    }

    findUserWithEmail = async (email: string) => {
        const users = await this.context.query.User.findMany({
            where: { email: { "equals": email } },
            query: 'id'
        });

        const [user] = users

        return user
    }

    findEventHostRole = async () => {
        const roles = await this.context.query.Role.findMany({
            where: {name: {"equals": "EventHost"}},
            query: 'id'
        });

        if (roles?.length === 0) {
            console.log('No Role was created, we cannot update the EventHost')
            return;
        }

        const [customerRole] = roles

        return customerRole
    }

    repair = async (eventHostName: string, venue: string) => {
        const email = this.buildEmail(eventHostName, venue)
        const eventHost = await this.findEventHostByEmail(email)

        const existingUsers = await this.context.query.User.findMany({
            where: {eventHost: {"id": {"equals": eventHost.id}}},
            query: 'id',
        })

        const [existingUser] = existingUsers

        if (!existingUser) { // we need to repair this eventHost that is not linked to a user yet
            console.log(`the eventHost ${eventHostName} has not user linked`)
            const userWithEventHostEmail = await this.findUserWithEmail(email)

            console.log('userWithEventHostEmail', {email, userWithEventHostEmail, eventHost })

            if (userWithEventHostEmail!== undefined) { // link this user with the eventHost
                await this.context.query.User.updateOne({
                    where: { id: userWithEventHostEmail.id },
                    data: {
                        eventHost: { connect: { id: eventHost.id } }
                    },
                    query: "id"
                });
            } else { // create a user for the eventHost
                const venue = eventHost.venue;
                const customerRole = await this.findEventHostRole()

                await this.context.query.User.createOne({
                    data: {
                        name: eventHost.name,
                        email: eventHost.email,
                        password: 'P1ssw0rd',
                        venue: {connect: {id: venue.id}},
                        role: {connect: {id: customerRole.id}}
                    },
                    query: 'id',
                })
                console.log('EventHost repaired by creating a new user', eventHost.name)
            }
        }
    }
}