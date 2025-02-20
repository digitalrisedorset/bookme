import {getDayTimeEnd} from "@/lib/date";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useEventHosts} from "@/components/eventHost/hooks/useEventHosts";
import {EventFilterKeys, EventType, EventHost} from "@/components/event/types/event";
import {useVenue} from "@/components/venue/hooks/useVenue";

export const useFilter = () => {
    const user = useUser()
    const {data} = useEventHosts()
    const venue = useVenue()

    const filter: EventFilterKeys = {}
    // filter['status'] = {
    //     "equals": AVAILABLE
    // }

    if (user === undefined) {
        return filter
    }

    if (user.weekPreference === "") {
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
    }

    if (user.eventType !== undefined) {
        const eventHostIds = getEventHostIdsForEventType(user?.eventType, data?.eventHosts)
        filter['eventHost'] = { "id": { "in": eventHostIds } }
    }

    return filter
}

const getEventHostIdsForEventType = (eventType: EventType, eventHosts: EventHost[]) => {
    const isEventHostDoingEventType = (item: EventHost): boolean => {
        if (item?.eventTypes === undefined) return false

        const match = item.eventTypes.filter((eventType: EventType) => eventType.id === eventType?.id)
        return match?.length>0
    }

    return eventHosts?.filter((item: EventHost) => isEventHostDoingEventType(item)).map((item: EventHost) => {
        return item.id
    });
}
