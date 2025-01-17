import {DayGroupEvent, DaysType, KeystoneEvent} from "@/components/event/types/event";
import {DayGroupEventHandler} from "@/components/event/models/DayGroupEvent";
import {UserInformation} from "@/components/user-authentication/hooks/useUser";

export class DayEvent {
    private day

    constructor(day: DaysType) {
        this.day = day.day
    }

    getDayEvents = (events: KeystoneEvent[], user: UserInformation) => {
        const dayEvents = events.filter((event: KeystoneEvent) => event.day === this.day)

        const groupEventByTime = this.getStartTimeEvents(dayEvents)

        const dayEventList = []

        for (const time in groupEventByTime) {
            if (!groupEventByTime.hasOwnProperty(time)) continue;

            const listEvents = groupEventByTime[time]
            dayEventList.push(this.getDayGroupEvent(listEvents, time, user))
        }

        return dayEventList
    }

    getDaySchedule = (events: KeystoneEvent[]) => {
        const dayEvents = events.filter((event: KeystoneEvent) => event.day === this.day)

        const groupEventByTime = this.getStartTimeEvents(dayEvents)

        const dayEventList = []

        for (const time in groupEventByTime) {
            if (!groupEventByTime.hasOwnProperty(time)) continue;

            dayEventList.push(groupEventByTime[time][0])
        }

        return dayEventList
    }

    getDayGroupEvent = (listEvents: KeystoneEvent[], time: string, user: UserInformation): DayGroupEvent => {
        const dayGroupEventHandler = new DayGroupEventHandler(time, user)

        for (const index in listEvents) {
            if (!listEvents.hasOwnProperty(index)) continue;

            dayGroupEventHandler.addEvent(listEvents[index])
        }

        return dayGroupEventHandler.getGroupEvent()
    }

    getStartTimeEvents = (events: KeystoneEvent[]) => {
        const getTimes = (times: [], event: KeystoneEvent) => {
            const startTime = event.startTime
            if (times[startTime]===undefined) {
                times[startTime] = []
            }
            times[startTime].push(event)

            return times
        }

        return events.reduce(getTimes, [])
    }
}