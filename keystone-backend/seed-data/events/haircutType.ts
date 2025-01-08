import {HaircutTypeCode, HaircutTypeProps} from "../types";
import type {KeystoneContext} from "@keystone-6/core/src/types";
import {HaircutTypeGroupCreator} from "./haircutTypeGroup";

export class HaircutTypeCreator {
    data = [
        {
            code: '1215_years',
            name: '12-15 Years',
            category: 'children',
            duration: 30,
            price: 27
        },
        {
            code: 'blow_dry',
            name: 'Blow Dry',
            category: 'ladies',
            duration: 20,
            price: 27
        },
        {
            code: 'long_hair_blow_dry',
            name: 'Long Hair Blow Dry',
            category: 'ladies',
            duration: 30,
            price: 27
        },
        {
            code: 'restyle_wash_cut_blowdry',
            name: 'Restyle Wash Cut Blow Dry',
            category: 'ladies',
            duration: 20,
            price: 27
        },
        {
            code: 'colour_bar_roots',
            name: 'Colour Bar Roots',
            category: 'colour',
            duration: 50,
            price: 18
        },
        {
            code: 'colour_touch_plus',
            name: 'Colour Touch Plus',
            category: 'colour',
            duration: 80,
            price: 33
        },
        {
            code: 'colour_touch',
            name: 'Colour Touch',
            category: 'colour',
            duration: 40,
            price: 32
        },
        {
            code: 'cut_finish',
            name: 'Cut Finish',
            category: 'ladies',
            duration: 30,
            price: 45
        },
        {
            code: 'full_highlights_long',
            name: 'Full Highlights Long',
            category: 'colour',
            duration: 90,
            price: 85
        },
        {
            code: 'full_highlights_short',
            name: 'Full Highlights Short',
            duration: 80,
            category: 'colour',
            price: 74
        },
        {
            code: 'half_head_long',
            name: 'Half Head Long',
            category: 'colour',
            duration: 50,
            price: 79
        },
        {
            code: 'half_head_short',
            name: 'Half Head Short',
            category: 'colour',
            duration: 40,
            price: 69
        },
        {
            code: 'olaplex',
            name: 'Olaplex',
            category: 'treatment',
            duration: 20,
            price: 22
        },
        {
            code: 'olaplex_standalone',
            name: 'Olaplex Stand alone',
            category: 'treatment',
            duration: 20,
            price: 22
        },
        {
            code: 'parting',
            name: 'Parting',
            category: 'colour',
            duration: 30,
            price: 37
        },
        {
            code: 'permanent_colour_full_head',
            name: 'Permanent colour full head',
            category: 'colour',
            duration: 40,
            price: 41
        },
        {
            code: 'permanent_colour_roots',
            name: 'Permanent colour roots',
            category: 'colour',
            duration: 60,
            price: 41
        },
        {
            code: 't_section_long',
            name: 'T Section Long',
            category: 'colour',
            duration: 20,
            price: 55
        },
        {
            code: 't_section_short',
            name: 'T Section Short',
            category: 'colour',
            duration: 40,
            price: 55
        },
        {
            code: 'technical_finish',
            name: 'Technical Finish',
            category: 'ladies',
            duration: 30,
            price: 32
        },
        {
            code: 'toner',
            name: 'Toner',
            category: 'colour',
            duration: 20,
            price: 19
        },
        {
            code: 'toner_standalone',
            name: 'Toner Standalone',
            category: 'colour',
            duration: 30,
            price: 32
        },
        {
            code: 'toner_longhair',
            name: 'Toner Long Hair',
            category: 'colour',
            duration: 40,
            price: 29
        },
        {
            code: 'wet_cut',
            name: 'Wet Cut',
            category: 'ladies',
            duration: 30,
            price: 34
        },
        {
            code: 'men_haircut',
            name: 'Men Haircut',
            category: 'men',
            duration: 30,
            price: 25
        },
        {
            code: 'men_haircut_die',
            name: 'Men Haircut Die',
            category: 'men',
            duration: 50,
            price: 35
        }];

    private context

    private haircutTypeGroupCreator: HaircutTypeGroupCreator

    constructor(context: KeystoneContext) {
        this.context = context
        this.haircutTypeGroupCreator = new HaircutTypeGroupCreator(context)
    }

    getHaircutTypeByCode = (code: HaircutTypeCode): any => {
        const haircutTypeName = this.findHaircutTypeNameByCode(code)
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
        const haircutTypeGroup = await this.haircutTypeGroupCreator.getHaircutTypeGroupByCode(haircutTypeInfo.category)

        if (!haircutType) {
            console.log(`👩 Adding new haircut type: ${haircutTypeInfo.name}`)
            await this.context.query.HaircutType.createOne({
                data: {
                    name: haircutTypeInfo.name,
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