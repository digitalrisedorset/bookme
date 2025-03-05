import {DayGroupEvent, DaysType, KeystoneEvent} from "@/components/event/types/event";
import {DayGroupEventHandler} from "@/components/event/models/DayGroupEvent";
import {UserInformation} from "@/components/user-authentication/hooks/useUser";

export class DayEventHandler {
    private day

    constructor(day: DaysType) {
        this.day = day.day
    }

    getDayEvents = (events: KeystoneEvent[], user: UserInformation | undefined) => {
        const dayEvents = events.filter((event: KeystoneEvent) => event.day === this.day)

        const groupEventByTime = this.getStartTimeEvents(dayEvents)

        const dayEventList: DayGroupEvent[] = []

        for (const time in groupEventByTime) {
            if (!groupEventByTime.hasOwnProperty(time)) continue;

            const listEvents = groupEventByTime[time]
            dayEventList.push(this.getDayGroupEvent(listEvents, time, user))
        }

        return dayEventList
    }

    getDayGroupEvent = (listEvents: KeystoneEvent[], time: string, user: UserInformation | undefined): DayGroupEvent => {
        const dayGroupEventHandler = new DayGroupEventHandler(time, user)

        for (const index in listEvents) {
            if (!listEvents.hasOwnProperty(index)) continue;

            dayGroupEventHandler.addEvent(listEvents[index])
        }

        return dayGroupEventHandler.getGroupEvent()
    }

    /**
     * Organise the events into an array whose keys are the different times for all the events
     * @param events
     */
    getStartTimeEvents = (events: KeystoneEvent[]): Record<string, KeystoneEvent[]> => {
        const getTimes = (times: Record<string, KeystoneEvent[]>, event: KeystoneEvent) => {
            const { startTime } = event;
            if (!times[startTime]) {
                times[startTime] = [];
            }
            times[startTime].push(event)

            return times
        }

        return events.reduce(getTimes, {})
    }
}