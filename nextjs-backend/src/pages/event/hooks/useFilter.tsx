import {getDayTimeEnd} from "@/lib/date";
import {useEventFilterState} from "@/state/EventFilterProvider";

export const useFilter = () => {

    const {eventFilter} = useEventFilterState()

    const filter = {}

    // if (eventFilter.activeHaircutType !== '') {
    //     filter['haircutType'] = {
    //         "id": {
    //             "equals": eventFilter.activeHaircutType
    //         }
    //     }
    // }

    if (eventFilter.activeWeek !== "") {
        const weekStart = eventFilter.activeWeek
        const weekStartDate = new Date(weekStart)
        const endWeek = getDayTimeEnd(new Date(weekStartDate.setDate(weekStartDate.getDate()+7)))

        filter['startTime'] = {
            "gte": weekStart
        }
        filter['endTime'] = {
            "lte": endWeek
        }
    }

    if (eventFilter.activeHairdresser !== '') {
        filter['hairdresser'] = {
            "id": {
                "equals": eventFilter.activeHairdresser
            }
        }
    }

    return filter
}