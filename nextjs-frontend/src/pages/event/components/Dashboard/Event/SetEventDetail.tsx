import React from "react";
import {DayGroupEvent} from "@/pages/event/types/event";
import {useRouter} from "next/router";
import {useEventState} from "@/state/EventState";
import {getGroupEventHairdresserInfo} from "@/pages/event/models/DayGroupEvent";
import {useEventFilterState} from "@/state/EventFilterProvider";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {getEventCartQty} from "@/lib/cart";
import {ViewButton} from "@/pages/global/styles/ItemStyles";

interface EventProps {
    eventGroup: DayGroupEvent
}

export const SetEventDetail: React.FC<EventProps> = ({eventGroup}: EventProps) => {
    const {eventFilter} = useEventFilterState()
    const router = useRouter()
    const user = useUser()

    const isEventInCart = () => {
        if (getEventCartQty(user?.cartItems, getEventId())>0) {
            return "true"
        }

        return "false"
    }

    const getEventId = () => {
        const eventInfo = getGroupEventHairdresserInfo(eventGroup)
        const match = eventInfo.filter(({hairdresser}: { hairdresser: string }) => eventFilter.activeHairdresser === hairdresser)//const [event] = events

        return match[0].eventId
    }

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        router.push({pathname: `/set-haircut-detail/${getEventId()}`});
    }

    return (
        <ViewButton incart={isEventInCart()}>
            <div className="in-cart">
                <p>You&apos;re in!</p>
            </div>
            <button className="view-detail" type="button" onClick={viewDetail}>
                View
            </button>
        </ViewButton>
    )
}