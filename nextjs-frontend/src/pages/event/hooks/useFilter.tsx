import {useEventFilterState} from "@/state/EventFilterProvider";
import {getDayTimeEnd} from "@/lib/date";
import {useUser} from "@/pages/user-authentication/hooks/useUser";

export const useFilter = () => {
    const user = useUser()

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
        filter['hairdresser'] = { "id": { "equals": user.hairdresser.id } }
    }

    return filter
}