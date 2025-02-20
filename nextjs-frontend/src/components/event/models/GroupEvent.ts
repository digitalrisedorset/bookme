import {DayGroupEvent, KeystoneEvent} from "@/components/event/types/event";
import {getTime} from "@/lib/date";
import {UserInformation} from "@/components/user-authentication/hooks/useUser";

export class GroupEventHandler {
    private groupEvent: DayGroupEvent

    private user: UserInformation

    constructor(user: UserInformation) {
        this.user = user
        this.groupEvent = {
            name: '',
            day: '',
            venue: { name: ''},
            status: '',
            startTime: '',
            eventHosts: [],
            orderedEventId: null,
            cartEvent: null,
            eventIds: []
        }
    }

    getGroupEvent = (events: KeystoneEvent[]) => {
        for (let i=0;i<events?.length;i++) {
            this.addEvent(events[i])
        }

        return this.groupEvent
    }

    addEvent = (event: KeystoneEvent) => {
        if (this.user === undefined) {
            console.warn('The user is not defined in class GroupEventHandler')
            return
        }

        this.groupEvent.day = event.day
        this.groupEvent.name = `${event.day} ${getTime(event.startTime)}`
        this.groupEvent.venue = event.venue
        this.groupEvent.startTime = event.startTime

        this.groupEvent.eventType = this.user?.eventType?.name

        this.groupEvent.eventHosts.push({
            eventHostId: event.eventHost.id,
            eventId: event.id
        })
    }
}
