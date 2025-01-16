import type {KeystoneContext} from "@keystone-6/core/src/types";
import { CustomerProps} from "../types";
import {customer} from "../sample-data/customer";
import {VenueCreator} from "./venue";

export class CustomerCreator {
    private context

    private data: CustomerProps[]

    private venueCreator: VenueCreator

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = customer
        this.venueCreator = new VenueCreator(context)
    }

    findVenueByCode = (code: string) => {
        return this.venueCreator.getVenueByCode(code)
    }

    getCustomerByCode = (code: string): any => {
        const haircutTypeName = this.findCustomerNameByCode(code)

        return this.findCustomerByCustomerName(haircutTypeName)
    }

    findCustomerNameByCode = (code: string): string => {
        const name = this.data.reduce((name, eventType) => {
            return (eventType.code === code)?eventType.name: name
        }, '')

        return name
    }

    findCustomerByCode = (code: string): string => {
        const haircutType = this.data.filter((haircutType) => {
            if (haircutType.code === code) return haircutType
        })

        if (haircutType) {
            return haircutType[0]
        }
    }

    findCustomerByCustomerName = async (name: string) => {
        let records = await this.context.query.User.findMany({
            where: { name: { "equals": name} },
            query: 'id name',
        })

        const [result] = records

        if (result) {
            return result
        }
    }

    createCustomer = async (customerData: CustomerProps) => {
        const customerInfo = await this.findCustomerByCode(customerData.code)
        const customer = await this.findCustomerByCustomerName(customerInfo.name)
        const venue = await this.findVenueByCode(customerInfo.venue)

        if (!customer) {
            console.log(`👩 Adding new customer: ${customerInfo.name}`)
            const customer = await this.context.query.User.createOne({
                data: {
                    name: customerInfo.name,
                    email: `${customerInfo.name.toLowerCase()}@${customerInfo.venue}.com`,
                    venue: { connect: { id: venue.id}},
                    password: 'P1ssw0rd'
                },
                query: 'id',
            })
        }
    }

    createAllCustomer = async () => {
        for (const customer: CustomerProps of this.data) {
            await this.createCustomer(customer)
        }
    }
}