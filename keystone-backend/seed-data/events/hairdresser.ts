import type {KeystoneContext} from "@keystone-6/core/src/types";
import {HaircutTypeGroupCode, HairdresserCode, HairdresserProps} from "../types";
import {HaircutTypeGroupCreator} from "./haircutTypeGroup";
import {HaircutTypeCreator} from "./haircutType";
import {flatten} from "../../lib/array";
import {haircutTypeGroup} from "../sample-data/haircutType";
import {hairdresser} from "../sample-data/hairdresser";
import {VenueCreator} from "./venue";

export class HairdresserCreator {
    private context

    private haircutTypeGroupCreator: HaircutTypeGroupCreator

    private haircutTypeCreator: HaircutTypeCreator

    private data: HairdresserProps[]

    private venueCreator: VenueCreator

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = hairdresser
        this.haircutTypeGroupCreator = new HaircutTypeGroupCreator(context)
        this.haircutTypeCreator = new HaircutTypeCreator(context)
        this.venueCreator = new VenueCreator(context)
    }

    findVenueByCode = (code: string) => {
        return this.venueCreator.getVenueByCode(code)
    }

    getHairdresserByCode = (code: HairdresserCode): any => {
        const haircutTypeName = this.findHairdresserNameByCode(code)

        return this.findHairdresserByHairdresserName(haircutTypeName)
    }

    findHairdresserNameByCode = (code: HairdresserCode): string => {
        const haircutTypeName = this.data.reduce((name, eventType) => {
            return (eventType.code === code)?eventType.name: name
        }, '')

        return haircutTypeName
    }

    findHairdresserByCode = (code: HairdresserCode): string => {
        const haircutType = this.data.filter((haircutType) => {
            if (haircutType.code === code) return haircutType
        })

        if (haircutType) {
            return haircutType[0]
        }
    }

    findHairdresserByHairdresserName = async (name: string) => {
        let records = await this.context.query.Hairdresser.findMany({
            where: { name: { "equals": name} },
            query: 'id level name',
        })

        const [result] = records

        if (result) {
            return result
        }
    }

    getHaircutTypesGroupByGroupCodes = async (codes: HaircutTypeGroupCode[]): any => {
        const groups = await Promise.all(codes.map(async (code:string) => {
            return await this.haircutTypeGroupCreator.getHaircutTypeGroupByCode(code)
        }, this))

        return groups
    }

    createHairdresser = async (hairdresserData: HairdresserProps) => {
        const hairdresserInfo = await this.findHairdresserByCode(hairdresserData.code)
        const hairdresser = await this.findHairdresserByHairdresserName(hairdresserInfo.name)
        const venue = await this.findVenueByCode(hairdresserInfo.venue)

        if (!hairdresser) {
            console.log(`👩 Adding new hairdresser: ${hairdresserInfo.name}`, {
                name: hairdresserInfo.name,
                level: hairdresserInfo.level
            })
            const hairdresser = await this.context.query.Hairdresser.createOne({
                data: {
                    name: hairdresserInfo.name,
                    email: `${hairdresserInfo.name.toLowerCase()}@${hairdresserInfo.venue}.com`,
                    level: hairdresserInfo.level,
                    venue: { connect: { id: venue.id}},
                },
                query: 'id',
            })
        }

        if (hairdresser) {
            const haircutTypeGroups = await this.getHaircutTypesGroupByGroupCodes(hairdresserData.haircutSpeciality)

            const haircutTypes = flatten(await Promise.all(haircutTypeGroups.map(async (haircutTypeGroup: any) => {
                return await this.haircutTypeCreator.getHaircutTypesByGroupId(haircutTypeGroup.id)
            }, this)))

            await Promise.all(haircutTypes.map(async (haircutType: any) => {
                await this.context.query.HaircutType.updateOne({
                    where: {id: haircutType.id},
                    data: {
                        hairdresser: { connect: { id: hairdresser.id}},
                    },
                    query: 'id',
                })
            }, this))
        }
    }

    createAllHairdresser = async () => {
        for (const hairdresser: HairdresserProps of this.data) {
            await this.createHairdresser(hairdresser)
        }
    }
}