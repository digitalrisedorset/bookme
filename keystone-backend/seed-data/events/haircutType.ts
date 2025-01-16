import {HaircutTypeCode, HaircutTypeProps} from "../types";
import type {KeystoneContext} from "@keystone-6/core/src/types";
import {HaircutTypeGroupCreator} from "./haircutTypeGroup";
import {haircutType} from "../sample-data/haircutType";

export class HaircutTypeCreator {
    private context

    private haircutTypeGroupCreator: HaircutTypeGroupCreator

    private data: HaircutTypeProps[]

    constructor(context: KeystoneContext) {
        this.context = context
        this.data = haircutType
        this.haircutTypeGroupCreator = new HaircutTypeGroupCreator(context)
    }

    getHaircutTypeByCode = async (code: HaircutTypeCode): any => {
        const haircutTypes = await this.context.query.HaircutType.findMany({
            where: { code: { "equals": code } },
            query: 'id name',
        })

        const [haircutType] = haircutTypes

        if (haircutType) {
            return haircutType
        }
    }

    findHaircutTypeNameByCode = (code: HaircutTypeCode): string => {
        const haircutTypeName = this.data.reduce((name, haircutType) => {
            return (haircutType.code === code)?haircutType.name: name
        }, '')

        return haircutTypeName
    }

    findHaircutTypeByCode = (code: HaircutTypeCode): string => {
        const haircutType = this.data.filter((haircutType) => {
            if (haircutType.code === code) return haircutType
        })

        if (haircutType) {
            return haircutType[0]
        }
    }

    getHaircutTypesByGroupId = async (groupId: string) => {
        const haircuts = await this.context.query.HaircutType.findMany({
            where: { group: { "id": { "equals": groupId}} },
            query: 'id',
        })

        return haircuts
    }

    findHaircutTypeByHaircutName = async (haircutName: string) => {
        const haircuts = await this.context.query.HaircutType.findMany({
            where: { name: { "equals": haircutName} },
            query: 'id base_price',
        })

        const [haircut] = haircuts

        if (haircut) {
            return haircut
        }
    }

    createHaircutType = async (haircutTypeData: HaircutTypeProps) => {
        const haircutTypeInfo = await this.findHaircutTypeByCode(haircutTypeData.code)
        const haircutType = await this.getHaircutTypeByCode(haircutTypeInfo.code)
        const haircutTypeGroup = await this.haircutTypeGroupCreator.getHaircutTypeGroupByCode(haircutTypeInfo.category)

        if (!haircutType) {
            console.log(`👩 Adding new haircut type: ${haircutTypeInfo.name}`)
            await this.context.query.HaircutType.createOne({
                data: {
                    name: haircutTypeInfo.name,
                    code: haircutTypeInfo.code,
                    base_price: haircutTypeInfo.price,
                    duration: haircutTypeInfo.duration,
                    group: { connect: { id: haircutTypeGroup.id}},
                },
                query: 'id',
            })
        }
    }

    createAllHaircutTypes = async () => {
        for (const haircutType: HaircutTypeProps of this.data) {
            await this.createHaircutType(haircutType)
        }
    }

}