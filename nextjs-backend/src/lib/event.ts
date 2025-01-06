import {KeystoneEvent} from "@/pages/event/types/event";
import {capitalise} from "@/lib/string";
import {getDate, getTime} from "@/lib/date";

export const getEventTitle = (event: KeystoneEvent) => {
    return `${capitalise(event.day)} ${getDate(event.startTime)} with ${capitalise(event.hairdresser.name)} at ${getTime(event.startTime)}`
}