import React from "react";
import {DayGroupEvent} from "@/components/event/types/event";
import {useRouter} from "next/router";
import {useUser} from "@/components/user-authentication/hooks/useUser";
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
        return eventGroup?.cartEvent !== null
    }

    const isAvailable = () => {
        return eventGroup?.cartEvent=== null && eventGroup?.orderedEventId === null
    }

    const wasOrdered = () => {
        return eventGroup?.orderedEventId !== null
    }

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        router.push({pathname: `/set-haircut-detail/${encodeURIComponent(JSON.stringify(eventGroup.eventIds))}`});
    }

    return (
        <ViewButton incart={isEventInCart() ? "true" : "false"} wasordered={wasOrdered() ? "true" : "false"}>
            <div className="in-cart">
                <p>In Cart!</p>
            </div>
            <div className="ordered">
                <p>Booked!</p>
            </div>
            {isAvailable() && <button className="view-detail" type="button" onClick={viewDetail}>
                View
            </button>}
            {isEventInCart() && <>
                <span className="timestamp">Finishing at {getTime(eventGroup?.cartEvent?.endTime)}</span>
            </>}
        </ViewButton>
    )
}