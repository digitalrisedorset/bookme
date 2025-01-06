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
            hairdresser: [],
            orderItem: []
        }
    }

    addEvent = (event: KeystoneEvent) => {
        this.groupEvent.day = event.day
        this.groupEvent.name = `${event.day} ${getTime(event.startTime)}`
        this.groupEvent.venue = event.venue
        if (event.orderItem?.id && this.groupEvent.orderItem[event.orderItem?.id]===undefined) {
            this.groupEvent.orderItem[event.orderItem?.id] =  event.id
        }

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
    let orderItem = getGroupEventOrderItemInfo(groupEvent)
    console.log('orderItem', orderItem)

    for (let hairdresser in groupEvent.hairdresser) {
        if (!groupEvent.hairdresser.hasOwnProperty(hairdresser)) continue;

        info.push({
            hairdresserId: hairdresser,
            eventId: groupEvent.hairdresser[hairdresser],
            orderItem: orderItem[groupEvent.hairdresser[hairdresser]]?? null
        })
    }

    if (orderItem.length) {
        console.log('info', info)
    }

    return info
}

export const getGroupEventOrderItemInfo = (groupEvent: DayGroupEvent) => {
    const info = {}
    for (let orderItem in groupEvent.orderItem) {
        if (!groupEvent.orderItem.hasOwnProperty(orderItem)) continue;

        info[groupEvent.orderItem[orderItem]] = orderItem
    }

    return info
}