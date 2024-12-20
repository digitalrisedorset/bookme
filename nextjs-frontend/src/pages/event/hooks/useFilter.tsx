import {useEventFilterState} from "@/state/EventFilterProvider";

export const useFilter = () => {
    const {eventFilter} = useEventFilterState()

    const filter = {}
    if (eventFilter.activeEventType !== '') {
        filter['eventType'] = {
            "name": {
                "equals": eventFilter.activeEventType
            }
        }
    }

    if (eventFilter.activeDay !== '') {
        filter['day'] = {
            "equals": eventFilter.activeDay
        }
    }

    if (eventFilter.activeVenue !== '') {
        filter['venue'] = {
            "name": {
                "equals": eventFilter.activeVenue
            }
        }
    }

    return filter
}