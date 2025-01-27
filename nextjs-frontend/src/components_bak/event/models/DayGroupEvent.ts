import {DayGroupEvent, EmptyGroup, KeystoneEvent} from "@/components/event/types/event";
import {getTime} from "@/lib/date";
import {UserInformation} from "@/components/user-authentication/hooks/useUser";
import {isEventInCart} from "@/lib/cart";

export class DayGroupEventHandler {
    private groupEvent: DayGroupEvent

    private user: UserInformation

    private hairdresserMapIds = []

    constructor(time: string, user: UserInformation) {
        this.groupEvent = EmptyGroup
        this.groupEvent.startTime = time
        this.user = user
    }

    addEvent = (event: KeystoneEvent) => {
        this.groupEvent.day = event.day
        this.groupEvent.name = `${event.day} ${getTime(event.startTime)}`
        this.groupEvent.venue = event.venue

        //this.addHairdresserMap(event.hairdresser.id, event.id, event.startTime)
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

    addHairdresserMap = (hairdresserId: string, eventId: string, startTime: string) => {
        if (hairdresserId === "daa99374-91a9-4adc-97c1-9c75c3dc2196") {
            console.log('adding map', {hairdresserId, eventId, startTime})
        }

        if (this.hairdresserMapIds[hairdresserId] === undefined) {
            if (hairdresserId === "daa99374-91a9-4adc-97c1-9c75c3dc2196") {
                console.log('adding map 1', {hairdresserId, eventId, startTime})
            }
            this.hairdresserMapIds[hairdresserId] = eventId
            this.groupEvent.hairdressers.push({
                hairdresserId,
                eventId
            })
        }
    }
}

export const getGroupEventHairdresserInfo = (groupEvent: DayGroupEvent) => {
    const info = []
    for (const hairdresser in groupEvent.hairdresser) {
        if (!groupEvent.hairdresser.hasOwnProperty(hairdresser)) continue;

        info.push({
            hairdresserId: hairdresser,
            eventId: groupEvent.hairdresser[hairdresser]
        })
    }

    return info
}