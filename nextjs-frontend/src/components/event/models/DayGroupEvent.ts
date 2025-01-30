import {DayGroupEvent, KeystoneEvent} from "@/components/event/types/event";
import {getTime} from "@/lib/date";
import {UserInformation} from "@/components/user-authentication/hooks/useUser";
import {isEventInCart} from "@/lib/cart";

export class DayGroupEventHandler {
    private groupEvent: DayGroupEvent

    private user: UserInformation

    constructor(time: string, user: UserInformation) {
        this.groupEvent = {
            name: '',
            day: '',
            venue: { name: ''},
            status: '',
            startTime: '',
            hairdressers: [],
            orderedEventId: null,
            cartEvent: null,
            eventIds: []
        }
        this.groupEvent.startTime = time
        this.user = user
    }

    addEvent = (event: KeystoneEvent) => {
        this.groupEvent.day = event.day
        this.groupEvent.name = `${event.day} ${getTime(event.startTime)}`
        this.groupEvent.venue = event.venue

        this.groupEvent.hairdressers.push({
            hairdresserId: event.hairdresser.id,
            eventId: event.id
        })

        if (event.orderItem?.event) {
            this.groupEvent.orderedEventId = event.id
        }

        if (isEventInCart(this.user?.cartItems, event.id)) {
            this.groupEvent.cartEvent = event
        }

        this.groupEvent.eventIds.push(event.id)
    }

    getGroupEvent = () => {
        return this.groupEvent
    }
}