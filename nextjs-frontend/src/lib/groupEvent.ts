import {BOOKED_EVENT, DayGroupEvent, PAST_EVENT, PURCHASED_EVENT} from "@/components/event/types/event";
import {capitalise} from "@/lib/string";
import {getDate, getTime} from "@/lib/date";
import {AVAILABLE, EventStatus, WALKIN} from "@/components/event/types/event";

export const getEventTitle = (event: DayGroupEvent) => {
    return `${capitalise(event.day)} ${getDate(event.startTime)} for ${capitalise(event.eventType)} at ${getTime(event.startTime)}`
}

export const isPastEvent = (eventGroup: DayGroupEvent) => {
    const date = new Date()
    const eventDate = new Date(eventGroup?.startTime)
    return eventDate < date
}

export const groupEventStatus = (eventGroup: DayGroupEvent): EventStatus => {
    if (isPastEvent(eventGroup)) {
        return PAST_EVENT
    }

    if (eventGroup?.cartEvent !== null) {
        return BOOKED_EVENT
    }

    if (eventGroup?.orderedEventId !== null) {
        return PURCHASED_EVENT
    }

    if (eventGroup.status === WALKIN) {
        return WALKIN
    }

    return AVAILABLE
}