import {HaircutTypeCode, HaircutTypeProps} from "../types";
import type {KeystoneContext} from "@keystone-6/core/src/types";

export class HaircutTypeCreator {
    data = [
        {
            code: 'men_haircut',
            name: 'Men Haircut',
            price: 18
        },
        {
            code: 'lady_haircut',
            name: 'Lady Haircut',
            price: 25
        },
        {
            code: 'lady_haircut_die',
            name: 'Lady Haircut Die',
            price: 45
        },
        {
            code: 'men_haircut_die',
            name: 'Men Haircut Die',
            price: 35
        }];

    private context

    constructor(context: KeystoneContext) {
        this.context = context
    }

    getHaircutTypeByCode = (code: HaircutTypeCode): any => {
        const haircutTypeName = this.findHaircutTypeNameByCode(code)
        console.log('getHaircutTypeByCode', {
            code,
            haircutTypeName
        })

        return this.findHaircutTypeByHaircutName(haircutTypeName)
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

    findHaircutTypeByHaircutName = async (haircutName: string) => {
        let haircuts = await this.context.query.HaircutType.findMany({
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
        const haircutType = await this.findHaircutTypeByHaircutName(haircutTypeInfo.name)

        if (!haircutType) {
            console.log(`👩 Adding new haircut type: ${haircutTypeInfo.name}`)
            await this.context.query.HaircutType.createOne({
                data: {
                    name: haircutTypeInfo.name,
                    base_price: haircutTypeInfo.price
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