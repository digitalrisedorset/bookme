import {getDayTimeEnd} from "@/lib/date";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useVenue} from "@/components/venue/hooks/useVenue";

export const useScheduleFilter = () => {
    const user = useUser()
    const venue = useVenue()

    const filter = {}

    if (!user) {
        return filter
    }

    filter['venue'] = {
        "id": {
            "equals": venue?.id
        }
    }

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
    } else {

    }

    filter['hairdresser'] = { "id": { "equals": user?.hairdresser?.id } }

    return filter
}

