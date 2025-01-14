import {VenueCode, VenueProps} from "../types";
import type {KeystoneContext} from "@keystone-6/core/src/types";
import {venue} from "../sample-data/hairdresser/venue";

export class VenueCreator {
    private context

    private data: VenueProps[]

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = venue
    }

    getVenueByCode = (code: VenueCode): string => {
        const venueName = this.findVenueNameByCode(code)

        return this.findVenueByName(venueName)
    }

    findVenueNameByCode = (code: VenueCode): string => {
        const venueName = this.data.reduce((name, venue) => {
            return (venue.code === code)?venue.name: name
        }, '')

        return venueName
    }

    findVenueByCode = (code: VenueCode): string => {
        const venueResult = this.data.filter((venue) => {
            if (venue.code === code) return venue
        })

        if (venueResult) {
            return venueResult[0]
        }
    }

    findVenueByName = async (venueName: string) => {
        let venues = await this.context.query.Venue.findMany({
            where: { name: { "equals": venueName} },
            query: 'id name',
        })

        const [venue] = venues

        if (venue) {
            return venue
        }
    }

    createVenue = async (venueData: VenueProps) => {
        const venueInfo = await this.findVenueByCode(venueData.code)
        const venue = await this.findVenueByName(venueInfo.name)

        if (!venue) {
            console.log(`👩 Adding new venue: ${venueInfo.name}`)
            await this.context.query.Venue.createOne({
                data: {
                    name: venueInfo.name
                },
                query: 'id',
            })
        }
    }

    createAllVenues = async () => {
        for (const venue: VenueProps of this.data) {
            await this.createVenue(venue)
        }
    }
}
