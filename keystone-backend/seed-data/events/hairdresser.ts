import type {KeystoneContext} from "@keystone-6/core/src/types";
import {HaircutTypeGroupCode, HairdresserCode, HairdresserProps} from "../types";
import {HaircutTypeGroupCreator} from "./haircutTypeGroup";
import {HaircutTypeCreator} from "./haircutType";
import {flatten} from "../../lib/array";

export class HairdresserCreator {
    data = [
        {
            code: 'carlos',
            name: 'carlos',
            level: 'apprentice',
            haircutSpeciality: ['children', 'men']
        },
        {
            code: 'linda',
            name: 'linda',
            level: 'junior',
            haircutSpeciality: ['ladies']
        },
        {
            code: 'charlotte',
            name: 'charlotte',
            level: 'senior',
            haircutSpeciality: ['treatment', 'colour']
        },
        {
            code: 'paul',
            name: 'paul',
            level: 'senior',
            haircutSpeciality: ['colour', 'men', 'ladies']
        },
        {
            code: 'rachelle',
            name: 'rachelle',
            level: 'senior',
            haircutSpeciality: ['colour', 'ladies', 'ladies']
        }];

    private context

    private haircutTypeGroupCreator: HaircutTypeGroupCreator

    private haircutTypeCreator: HaircutTypeCreator

    constructor(context: KeystoneContext) {
        this.context = context
        this.haircutTypeGroupCreator = new HaircutTypeGroupCreator(context)
        this.haircutTypeCreator = new HaircutTypeCreator(context)
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

    getHaircutTypesByGroup = async (codes: HaircutTypeGroupCode[]): any => {
        const result = await Promise.all(codes.reduce(async (prev: any, code: HaircutTypeGroupCode) => {
            console.log('getHaircutTypesByGroup 1', code)
            const haircutGroup = await this.haircutTypeGroupCreator.getHaircutTypeGroupByCode(code)

            if (haircutGroup) {
                console.log('getHaircutTypesByGroup 2', code)

                // const haircutTypes = await this.context.query.HaircutType.findMany({
                //     where: { group: { "id": { "equals": haircutGroup.id } }},
                //     query: 'id',
                // })
                //
                // console.log('getHaircutTypesByGroup 3', code)
                //
                // if (haircutTypes?.length >0) {
                //     console.log('haircutTypes', haircutTypes.length)
                //     const haircutTypesFlat = []
                //     haircutTypesFlat.forEach((haircutType: any) => {
                //         prev.push(haircutType)
                //     })
                // }

                console.log('getHaircutTypesByGroup 4', code)
            }
        }, this))

        return result
    }

    createHairdresser = async (hairdresserData: HairdresserProps) => {
        const hairdresserInfo = await this.findHairdresserByCode(hairdresserData.code)
        const hairdresser = await this.findHairdresserByHairdresserName(hairdresserInfo.name)

        if (!hairdresser) {
            console.log(`👩 Adding new hairdresser: ${hairdresserInfo.name}`, {
                name: hairdresserInfo.name,
                level: hairdresserInfo.level
            })
            const hairdresser = await this.context.query.Hairdresser.createOne({
                data: {
                    name: hairdresserInfo.name,
                    level: hairdresserInfo.level
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