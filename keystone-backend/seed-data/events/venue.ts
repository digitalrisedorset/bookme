import {VenueCode, VenueProps} from "../types";
import type {KeystoneContext} from "@keystone-6/core/src/types";

export class VenueCreator {
    data = [
        {
            code: 'st_yves',
            name: 'St Ives & St Leonard',
            capacity: 20
        }, {
            code: 'hamworthy',
            name: 'Hamworthy',
            capacity: 40
        },
        {
            code: 'poole',
            name: 'Poole',
            capacity: 30
        },
        {
            code: 'bourne',
            name: 'Bourne',
            capacity: 50
        },
        {
            code: 'muscliff',
            name: 'Muscliff',
            capacity: 20
        }];

    private context

    constructor(context: KeystoneContext) {
        this.context = context
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
            query: 'id capacity',
        })

        const [venue] = venues

        if (venue) {
            return venue
        }
    }

    createVenue = async (venueData: VenueProps) => {
        const venueInfo = await this.findVenueByCode(venueData.code)
        const venue = await this.findVenueByName(venueInfo.name)

        console.log('venue', venueInfo)

        if (!venue) {
            console.log(`👩 Adding new venue: ${venueInfo.name}`)
            await this.context.query.Venue.createOne({
                data: {
                    name: venueInfo.name,
                    capacity: venueInfo.capacity
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
