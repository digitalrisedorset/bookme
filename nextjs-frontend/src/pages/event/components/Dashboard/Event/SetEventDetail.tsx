import React from "react";
import {DayGroupEvent} from "@/pages/event/types/event";
import {useRouter} from "next/router";
import {getGroupEventHairdresserInfo} from "@/pages/event/models/DayGroupEvent";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {getEventCartQty} from "@/lib/cart";
import {ViewButton} from "@/pages/global/styles/ItemStyles";

interface EventProps {
    eventGroup: DayGroupEvent
}

export const SetEventDetail: React.FC<EventProps> = ({eventGroup}: EventProps) => {
    const router = useRouter()
    const user = useUser()

    if (!user) return null

    const isEventInCart = () => {
        if (getEventCartQty(user?.cartItems, eventId)>0) {
            return "true"
        }

        return "false"
    }

    const getEventId = (eventGroup: DayGroupEvent) => {
        const eventInfo = getGroupEventHairdresserInfo(eventGroup)
        const match = eventInfo.filter(({hairdresserId}: { hairdresserId: string }) => user?.hairdresser.id === hairdresserId)

        return match[0].eventId
    }

    const eventId = getEventId(eventGroup)

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        router.push({pathname: `/set-haircut-detail/${eventId}`});
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