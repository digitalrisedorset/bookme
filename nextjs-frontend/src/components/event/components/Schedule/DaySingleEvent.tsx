import React from "react";
import {AVAILABLE, DayScheduleEvent, PURCHASED_EVENT} from "@/components/event/types/event";
import { SingleScheduleEvent, ViewButton} from "@/components/global/styles/ItemStyles";
import {getTime} from "@/lib/date";
import {useRouter} from "next/router";
import {eventStatus} from "@/lib/event";

interface ListingProps {
    event: DayScheduleEvent
}

export const DaySingleEvent: React.FC<ListingProps> = ({event}: ListingProps) => {
    const router = useRouter()

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        router.push({pathname: `/view-scheduled-event/${event.id}`});
    }

    const bookEvent = (e: React.FormEvent) => {
        e.preventDefault();
        router.push({pathname: `/book-event/${event.id}`});
    }

    return (<SingleScheduleEvent status={eventStatus(event)}>
        <p>{getTime(event.startTime)}</p>
        <p>{event.orderItem?.order?.user?.name}</p>
        <div className="past-event">
            <p>Done!</p>
        </div>
        <div className="walk-in">
            <p>Walk In!</p>
        </div>
        <div className="unavailable">
            <p>Busy</p>
        </div>
        {eventStatus(event) === PURCHASED_EVENT && <ViewButton>
            <button className="view-detail" type="button" onClick={viewDetail}>
                View
            </button>
        </ViewButton>}
        {eventStatus(event) === AVAILABLE && <ViewButton>
            <button className="view-detail" type="button" onClick={bookEvent}>
                Book
            </button>
        </ViewButton>}
    </SingleScheduleEvent>)
}