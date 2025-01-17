import React from "react";
import {EventRow, ViewEventStyle} from "@/components/global/styles/ItemStyles";
import {getEventTitle} from "@/lib/event";
import {useSheduledEvent} from "@/components/event/hooks/useScheduledEvent";
import {formatMoney} from "@/lib/price";
import {getTime} from "@/lib/date";
import {Loading} from "@/components/global/components/Loading";

interface ViewEventProps {
    eventId: string
}

export const ViewEvent: React.FC<ViewEventProps> = ({eventId}: ViewEventProps) => {
    const { data, loading } = useSheduledEvent(eventId)

    if (loading) return <Loading />

    const {event} = data

    return (
        <ViewEventStyle>
            <h5>Your scheduled appointment details</h5>
            <EventRow>
                <span className="label">Appointment</span>
                <p className="title">{getEventTitle(event)}</p>
            </EventRow>
            <EventRow>
                <span className="label">Customer</span>
                <p className="title">{event.orderItem.order.user.name}</p>
            </EventRow>
            <EventRow>
                <span className="label">Estimated end time</span>
                <span className="title">{getTime(event.endTime)}</span>
            </EventRow>
            <EventRow>
                <span className="label">Order Reference</span>
                <span className="price">{event.orderItem.order.orderReference}</span>
            </EventRow>
            <EventRow>
                <span className="label">Price</span>
                <span className="price">{formatMoney(event.orderItem.price)}</span>
            </EventRow>
        </ViewEventStyle>
    )
}