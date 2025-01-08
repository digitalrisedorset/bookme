import {DayGroupEvent, DaysType, Hairdresser, KeystoneEvent} from "@/components/event/types/event";
import {DayGroupEventHandler} from "@/components/event/models/DayGroupEvent";

export class DayEvent {
    private day

    constructor(day: DaysType) {
        this.day = day.day
    }

    getDayEvents = (events: KeystoneEvent[]) => {
        const dayEvents = events.filter((event: KeystoneEvent) => event.day === this.day)

        const groupEventByTime = this.getStartTimeEvents(dayEvents)

        const dayEventList = []

        for (let time in groupEventByTime) {
            if (!groupEventByTime.hasOwnProperty(time)) continue;

            let listEvents = groupEventByTime[time]
            dayEventList.push(this.getDayGroupEvent(listEvents, time))
        }


        return dayEventList
    }

    getDayGroupEvent = (listEvents: object, time: string): DayGroupEvent[] => {
        const dayGroupEventHandler = new DayGroupEventHandler(time)

        for (let index in listEvents) {
            if (!listEvents.hasOwnProperty(index)) continue;

            dayGroupEventHandler.addEvent(listEvents[index])
        }

        return dayGroupEventHandler.getGroupEvent()
    }

    getStartTimeEvents = (events: KeystoneEvent[]) => {
        const getTimes = (times: [], event: KeystoneEvent) => {
            let startTime = event.startTime//new Date(event.startTime).getTime()
            if (times[startTime]===undefined) {
                times[startTime] = []
            }
            times[startTime].push(event)

            return times
        }

        return events.reduce(getTimes, [])
    }
}