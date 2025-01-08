import React from "react";
import {DayGroupEvent} from "@/components/event/types/event";
import {useRouter} from "next/router";
import {getGroupEventHairdresserInfo} from "@/components/event/models/DayGroupEvent";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getEventCartQty, getEventInCart} from "@/lib/cart";
import {ViewButton} from "@/components/global/styles/ItemStyles";
import {getTime} from "@/lib/date";

interface EventProps {
    eventGroup: DayGroupEvent
}

export const SetEventDetail: React.FC<EventProps> = ({eventGroup}: EventProps) => {
    const router = useRouter()
    const user = useUser()

    if (!user) return null

    const isEventInCart = () => {
        if (getEventCartQty(user?.cartItems, getEventIds(eventGroup))>0) {
            return "true"
        }

        return "false"
    }

    const getEventIds = (eventGroup: DayGroupEvent) => {
        const eventInfo = getGroupEventHairdresserInfo(eventGroup)
        return eventInfo.map(({eventId}: { eventId: string }) => eventId)
    }

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        const eventIds = getEventIds(eventGroup)
        router.push({pathname: `/set-haircut-detail/${encodeURIComponent(JSON.stringify(eventIds))}`});
    }

    const inCart = isEventInCart()
    const eventInCart = getEventInCart(user?.cartItems, getEventIds(eventGroup))
    console.log('eventInCart', eventInCart)

    return (
        <ViewButton incart={inCart}>
            <div className="in-cart">
                <p>You&apos;re in!</p>
            </div>
            {(inCart==="false") &&<button className="view-detail" type="button" onClick={viewDetail}>
                View
            </button>}
            {(inCart==="true") &&<>
                <span className="timestamp">Finishing at {getTime(eventInCart?.event.endTime)}</span>
            </>}
        </ViewButton>
    )
}