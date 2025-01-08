import {getDayTimeEnd} from "@/lib/date";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useHairdressers} from "@/components/hairdresser/hooks/useHairdressers";
import {HaircutType, Hairdresser} from "@/components/event/types/event";

export const useFilter = () => {
    const user = useUser()
    const {data} = useHairdressers()

    const filter = {}

    if (!user) {
        return filter
    }

    if (user.weekPreference === "") {
        return filter
    }


    // if (user.haircutType !== '') {
    //     filter['haircutType'] = {
    //         "name": {
    //             "equals": user.haircutType
    //         }
    //     }
    // }

    if (user.weekPreference !== "") {
        const weekStart = user.weekPreference
        const weekStartDate = new Date(weekStart)
        const endWeek = getDayTimeEnd(new Date(weekStartDate.setDate(weekStartDate.getDate()+7)))

        filter['startTime'] = {
            "gte": weekStart
        }
        filter['endTime'] = {
            "lte": endWeek
        }
    }

    if (user.hairdresser !== '') {
        filter['hairdresser'] = { "id": { "equals": user?.hairdresser?.id } }
    }

    if (user.haircutType !== '') {
        const hairdresserIds = getHairdresserIdsForHaircut(user?.haircutType, data?.hairdressers)
        filter['hairdresser'] = { "id": { "in": hairdresserIds } }
    }

    return filter
}

const getHairdresserIdsForHaircut = (haircutType: HaircutType, hairdressers: Hairdresser[]) => {
    const isHairdresserDoingHaircut = (item: Hairdresser): Hairdresser[] => {
        const match = item.haircutTypes.filter((haircut: HaircutType) => haircut.id === haircutType?.id)
        return match?.length>0
    }

    return hairdressers?.filter((item: Hairdresser) => isHairdresserDoingHaircut(item)).map((item: Hairdresser) => {
        return item.id
    });
}
