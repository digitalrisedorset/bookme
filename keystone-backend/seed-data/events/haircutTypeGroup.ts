import {
    HaircutTypeCode,
    HaircutTypeGroup,
    HaircutTypeGroupCode,
    HaircutTypeGroupProps,
    HaircutTypeProps
} from "../types";
import type {KeystoneContext} from "@keystone-6/core/src/types";

export class HaircutTypeGroupCreator {
    data = [
        {
            code: 'children',
            name: 'Children'
        },
        {
            code: 'ladies',
            name: 'Ladies',
        },
        {
            code: 'colour',
            name: 'Colour'
        },
        {
            code: 'treatment',
            name: 'Treatment'
        },
        {
            code: 'men',
            name: 'Men'
        }];

    private context

    constructor(context: KeystoneContext) {
        this.context = context
    }

    getHaircutTypeGroupByCode = (code: HaircutTypeGroupCode): any => {
        const haircutTypeGroupName = this.findHaircutTypeGroupNameByCode(code)

        return this.findHaircutTypeByHaircutName(haircutTypeGroupName)
    }

    findHaircutTypeGroupNameByCode = (code: HaircutTypeGroupCode): string => {
        const haircutTypeGroupName = this.data.reduce((name, haircutTypeGroup) => {
            return (haircutTypeGroup.code === code)?haircutTypeGroup.name: name
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

    findHaircutTypeByHaircutName = async (haircutGroupName: string) => {
        let haircutTypeGroups = await this.context.query.HaircutTypeGroup.findMany({
            where: { name: { "equals": haircutGroupName} },
            query: 'id',
        })

        const [haircutTypeGroup] = haircutTypeGroups

        if (haircutTypeGroup) {
            return haircutTypeGroup
        }
    }

    createHaircutTypeGroup = async (haircutTypeGroupData: HaircutTypeGroupProps) => {
        const haircutTypeGroupInfo = await this.findHaircutTypeGroupByCode(haircutTypeGroupData.code)
        const haircutTypeGroup = await this.findHaircutTypeByHaircutName(haircutTypeGroupInfo.name)

        if (!haircutTypeGroup) {
            console.log(`👩 Adding new haircut type group: ${haircutTypeGroupInfo.name}`)
            await this.context.query.HaircutTypeGroup.createOne({
                data: {
                    name: haircutTypeGroupInfo.name
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