import type {KeystoneContext} from "@keystone-6/core/src/types";
import {Hairdresser} from "../../../schemas/Hairdresser";
const graphql = String.raw;

export class HairdresserRepair {
    private context

    constructor(context: KeystoneContext) {
        this.context = context
    }

    buildEmail = (name: string, venue: string) => {
        return `${name.toLowerCase()}@${venue}.com`
    }

    findHairdresserByEmail = async (email: string) => {
        let records = await this.context.query.Hairdresser.findMany({
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

    findHairdresserRole = async () => {
        const roles = await this.context.query.Role.findMany({
            where: {name: {"equals": "Hairdresser"}},
            query: 'id'
        });

        if (roles?.length === 0) {
            console.log('No Role was created, we cannot update the Hairdresser')
            return;
        }

        const [customerRole] = roles

        return customerRole
    }

    repair = async (hairdresserName: string, venue: string) => {
        const email = this.buildEmail(hairdresserName, venue)
        const hairdresser = await this.findHairdresserByEmail(email)

        const existingUsers = await this.context.query.User.findMany({
            where: {hairdresser: {"id": {"equals": hairdresser.id}}},
            query: 'id',
        })

        const [existingUser] = existingUsers

        if (!existingUser) { // we need to repair this hairdresser that is not linked to a user yet
            console.log(`the hairdresser ${hairdresserName} has not user linked`)
            const userWithHairdresserEmail = await this.findUserWithEmail(email)

            console.log('userWithHairdresserEmail', {email, userWithHairdresserEmail, hairdresser })

            if (userWithHairdresserEmail!== undefined) { // link this user with the hairdresser
                await this.context.query.User.updateOne({
                    where: { id: userWithHairdresserEmail.id },
                    data: {
                        hairdresser: { connect: { id: hairdresser.id } }
                    },
                    query: "id"
                });
            } else { // create a user for the hairdresser
                const venue = hairdresser.venue;
                const customerRole = await this.findHairdresserRole()

                await this.context.query.User.createOne({
                    data: {
                        name: hairdresser.name,
                        email: hairdresser.email,
                        password: 'P1ssw0rd',
                        venue: {connect: {id: venue.id}},
                        role: {connect: {id: customerRole.id}}
                    },
                    query: 'id',
                })
                console.log('Hairdresser repaired by creating a new user', hairdresser.name)
            }
        }
    }
}