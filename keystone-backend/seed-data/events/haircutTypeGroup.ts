import {
    HaircutTypeGroupCode,
    HaircutTypeGroupProps
} from "../types";
import type { KeystoneContext } from "@keystone-6/core/src/types";
import {haircutTypeGroup} from "../sample-data/haircutType";
import {VenueCreator} from "./venue";

export class HaircutTypeGroupCreator {
    private context

    private data: HaircutTypeGroupProps[]

    private venueCreator: VenueCreator

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = haircutTypeGroup
        this.venueCreator = new VenueCreator(context)
    }

    getHaircutTypeGroupByCode = async (code: HaircutTypeGroupCode): any => {
        const haircutTypeGroups = await this.context.query.HaircutTypeGroup.findMany({
            where: { code: { "equals": code } },
            query: 'id name',
        })

        const [haircutTypeGroup] = haircutTypeGroups

        if (haircutTypeGroup) {
            return haircutTypeGroup
        }
    }

    findHaircutTypeGroupNameByCode = (code: HaircutTypeGroupCode): string => {
        const haircutTypeGroupName = this.data.reduce((name, haircutTypeGroup) => {
            return (haircutTypeGroup.code === code) ? haircutTypeGroup.name : name
        }, '')

        return haircutTypeGroupName
    }

    findHaircutTypeGroupByCode = (code: HaircutTypeGroupCode): string => {
        const haircutTypeGroup = this.data.filter((haircutTypeGroup) => {
            if (haircutTypeGroup.code === code) return haircutTypeGroup
        })

        if (haircutTypeGroup) {
            return haircutTypeGroup[0]
        }
    }

    findVenueByCode = (code: string) => {
        return this.venueCreator.getVenueByCode(code)
    }

    findHaircutTypeGroupByHaircutName = async (haircutGroupName: string) => {
        let haircutTypeGroups = await this.context.query.HaircutTypeGroup.findMany({
            where: { name: { "equals": haircutGroupName } },
            query: 'id name',
        })

        const [haircutTypeGroup] = haircutTypeGroups

        if (haircutTypeGroup) {
            return haircutTypeGroup
        }
    }

    createHaircutTypeGroup = async (haircutTypeGroupData: HaircutTypeGroupProps) => {
        const haircutTypeGroup = await this.getHaircutTypeGroupByCode(haircutTypeGroupData.code)
        const venue = await this.findVenueByCode(haircutTypeGroupData.venue)

        if (!haircutTypeGroup) {
            console.log(`👩 Adding new haircut type group: ${haircutTypeGroupData.name}`)
            await this.context.query.HaircutTypeGroup.createOne({
                data: {
                    code: haircutTypeGroupData.code,
                    name: haircutTypeGroupData.name,
                    venue: { connect: { id: venue?.id}},
                },
                query: 'id',
            })
        }
    }

    createAllHaircutGroupTypes = async () => {
        for (const haircutTypeGroup: HaircutTypeGroupProps of this.data) {
            await this.createHaircutTypeGroup(haircutTypeGroup)
        }
    }

}