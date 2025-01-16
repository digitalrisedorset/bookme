import {
    AVAILABLE,
    BOOKED_EVENT,
    EventStatus,
    KeystoneEvent,
    PAST_EVENT, PURCHASED_EVENT,
    WALKIN,
    WALKIN_EVENT
} from "@/components/event/types/event";
import {capitalise} from "@/lib/string";
import {getDate, getTime} from "@/lib/date";

export const getEventTitle = (event: KeystoneEvent) => {
    return `${capitalise(event.day)} ${getDate(event.startTime)} with ${capitalise(event.hairdresser.name)} at ${getTime(event.startTime)}`
}

export const isPastEvent = (event: KeystoneEvent) => {
    const date = new Date()
    const eventDate = new Date(event?.startTime)
    return eventDate < date
}

export const eventStatus = (event: KeystoneEvent): EventStatus => {
    if (isPastEvent(event)) {
        return PAST_EVENT
    }

    if (event.status === WALKIN) {
        return WALKIN_EVENT
    }

    if (event.orderItem !== null) {
        return PURCHASED_EVENT
    }

    return AVAILABLE
}