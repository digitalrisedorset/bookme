import React from "react";
import {AVAILABLE, BOOKED_EVENT, DayGroupEvent} from "@/components/event/types/event";
import {useRouter} from "next/router";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {ViewButton} from "@/components/global/styles/ItemStyles";
import {getTime} from "@/lib/date";
import {useEventState} from "@/state/EventState";
import {groupEventStatus} from "@/lib/groupEvent";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";

interface EventProps {
    eventGroup: DayGroupEvent
}

export const SetEventDetail: React.FC<EventProps> = ({eventGroup}: EventProps) => {
    const {resetActiveEvent} = useEventState()
    const {activeVenue} = useVenueConfigState()
    const router = useRouter()
    const user = useUser()

    if (!user) return null

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        resetActiveEvent()
        router.push({pathname: `/set-event-detail/${encodeURIComponent(JSON.stringify(eventGroup.eventIds))}`});
    }

    return (
        <ViewButton status={groupEventStatus(eventGroup)}>
            <div className="past-event">
                <p>Done!</p>
            </div>
            <div className="in-cart">
                <p>{tr('In Cart!', activeVenue)}</p>
            </div>
            <div className="ordered">
                <p>Booked!</p>
            </div>
            {groupEventStatus(eventGroup) === AVAILABLE && <button className="view-detail" type="button" onClick={viewDetail}>
                View
            </button>}
            {groupEventStatus(eventGroup) === BOOKED_EVENT && <>
                <span className="timestamp">Finishing at {getTime(eventGroup?.cartEvent?.endTime || '')}</span>
            </>}
        </ViewButton>
    )
}