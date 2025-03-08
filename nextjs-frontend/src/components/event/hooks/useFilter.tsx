import {getDayTimeEnd} from "@/lib/date";
import {useEventHosts} from "@/components/eventHost/hooks/useEventHosts";
import {EventFilterKeys, EventType, EventHost, AVAILABLE} from "@/components/event/types/event";
import {useVenue} from "@/components/venue/hooks/useVenue";
import {useUserPreferenceState} from "@/state/UserPreference";

export const useFilter = () => {
    const {userPreference} = useUserPreferenceState()
    const {data} = useEventHosts()
    const venue = useVenue()

    const filter: EventFilterKeys = {
        status: {
            "equals": AVAILABLE
        }}

    if (userPreference === undefined) {
        return filter
    }

    if (userPreference.weekPreference === "") {
        return filter
    }

    filter['venue'] = {
        "id": {
            "equals": venue?.id
        }
    }

    if (userPreference.weekPreference !== "") {
        const weekStart = userPreference.weekPreference
        const weekStartDate = new Date(weekStart)
        const endWeek = getDayTimeEnd(new Date(weekStartDate.setDate(weekStartDate.getDate()+7)))

        filter['startTime'] = {
            "gte": weekStart
        }
        filter['endTime'] = {
            "lte": endWeek
        }
    }

    if (userPreference.eventTypeId !== null) {
        const eventHostIds = getEventHostIdsForEventType(userPreference?.eventTypeId, data?.eventHosts)
        filter['eventHost'] = { "id": { "in": eventHostIds } }
    }

    return filter
}

const getEventHostIdsForEventType = (eventTypeId: string, eventHosts: EventHost[]) => {
    const isEventHostDoingEventType = (item: EventHost): boolean => {
        if (item?.eventTypes === undefined) return false

        const match = item.eventTypes.filter((eventType: EventType) => eventType.id === eventTypeId)
        return match?.length>0
    }

    return eventHosts?.filter((item: EventHost) => isEventHostDoingEventType(item)).map((item: EventHost) => {
        return item.id
    });
}
