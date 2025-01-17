import {DayGroupEvent, KeystoneEvent} from "@/components/event/types/event";
import {getTime} from "@/lib/date";
import {UserInformation} from "@/components/user-authentication/hooks/useUser";

export class GroupEventHandler {
    private groupEvent: DayGroupEvent = {}

    private user: UserInformation

    constructor(user: UserInformation) {
        this.user = user
        this.groupEvent = {
            name: '',
            day: '',
            venue: '',
            startTime: '',
            hairdresser: []
        }
    }

    getGroupEvent = (events: KeystoneEvent[]) => {
        for (let i=0;i<events?.length;i++) {
            this.addEvent(events[i])
        }

        return this.groupEvent
    }

    addEvent = (event: KeystoneEvent) => {
        this.groupEvent.day = event.day
        this.groupEvent.name = `${event.day} ${getTime(event.startTime)}`
        this.groupEvent.venue = event.venue
        this.groupEvent.startTime = event.startTime

        this.groupEvent.haircutType = this.user.haircutType.name

        this.groupEvent.hairdresser[event.hairdresser.id] = event.id
    }
}
