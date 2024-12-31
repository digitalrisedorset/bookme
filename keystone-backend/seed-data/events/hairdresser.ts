import type {KeystoneContext} from "@keystone-6/core/src/types";
import {HairdresserCode, HairdresserProps} from "../types";

export class HairdresserCreator {
    data = [
        {
            code: 'carlos',
            name: 'carlos',
            level: 'apprentice'
        },
        {
            code: 'linda',
            name: 'linda',
            level: 'junior',
            haircut: ['lady_haircut', 'lady_haircut_die']
        },
        {
            code: 'paul',
            name: 'paul',
            level: 'senior',
            haircut: ['lady_haircut', 'lady_haircut_die', 'men_haircut', 'men_haircut_die']
        }];

    private context

    constructor(context: KeystoneContext) {
        this.context = context
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
            query: 'id level',
        })

        const [result] = records

        if (result) {
            return result
        }
    }

    createHairdresser = async (hairdresserData: HairdresserProps) => {
        const hairdresserInfo = await this.findHairdresserByCode(hairdresserData.code)
        const hairdresser = await this.findHairdresserByHairdresserName(hairdresserInfo.name)

        if (!hairdresser) {
            console.log(`👩 Adding new hairdresser: ${hairdresserInfo.name}`, {
                name: hairdresserInfo.name,
                level: hairdresserInfo.level
            })
            await this.context.query.Hairdresser.createOne({
                data: {
                    name: hairdresserInfo.name,
                    level: hairdresserInfo.level
                },
                query: 'id',
            })
        }
    }

    createAllHairdresser = async () => {
        for (const hairdresser: HairdresserProps of this.data) {
            await this.createHairdresser(hairdresser)
        }
    }

}