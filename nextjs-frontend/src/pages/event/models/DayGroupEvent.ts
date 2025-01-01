import {DayGroupEvent, KeystoneEvent} from "@/pages/event/types/event";
import {getTime} from "@/lib/date";

export class DayGroupEventHandler {
    private groupEvent: DayGroupEvent = {}

    constructor(time: string) {
        this.groupEvent = {
            name: '',
            day: '',
            venue: '',
            startTime: time,
            hairdresser: []
        }
    }

    addEvent = (event: KeystoneEvent) => {
        this.groupEvent.day = event.day
        this.groupEvent.name = `${event.day} ${getTime(event.startTime)}`
        this.groupEvent.venue = event.venue

        if (this.groupEvent.hairdresser[event.hairdresser.id]===undefined) {
            this.groupEvent.hairdresser[event.hairdresser.id] = event.id
        }
    }

    getGroupEvent = () => {
        return this.groupEvent
    }
}

export const getGroupEventHairdresserInfo = (groupEvent: DayGroupEvent) => {
    const info = []
    for (let hairdresser in groupEvent.hairdresser) {
        if (!groupEvent.hairdresser.hasOwnProperty(hairdresser)) continue;

        info.push({
            hairdresserId: hairdresser,
            eventId: groupEvent.hairdresser[hairdresser]
        })
    }

    return info
}