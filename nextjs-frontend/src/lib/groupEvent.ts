import {DayGroupEvent} from "@/pages/event/types/event";
import {capitalise} from "@/lib/string";
import {getDate, getTime} from "@/lib/date";

export const getEventTitle = (event: DayGroupEvent) => {
    return `${capitalise(event.day)} ${getDate(event.startTime)} for ${capitalise(event.haircutType)} at ${getTime(event.startTime)}`
}