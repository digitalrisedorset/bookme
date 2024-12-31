import React from "react";
import {EventRow, ViewEventStyle} from "@/pages/global/styles/ItemStyles";
import {getDate} from "@/lib/date";
import {HaircutSelect} from "@/pages/event/components/Dashboard/DayEvent/HaircutSelect";
import {useEvent} from "@/pages/event/hooks/useEvent";
import {AddToCart} from "@/pages/event/components/Dashboard/Event/AddToCart";
import {ShampooSelect} from "@/pages/event/components/Dashboard/Event/ShampooSelect";
import {getEventTitle} from "@/lib/event";
import {useEventPrice} from "@/pages/event/hooks/useEventPrice";
import {formatMoney} from "@/lib/price";

interface ViewEventProps {
    eventId: string
}

export const ViewEvent: React.FC<ViewEventProps> = ({eventId}: ViewEventProps) => {
    const { data, loading } = useEvent(eventId)
    const price = useEventPrice(eventId)

    if (loading) return <>Loading</>

    const {event} = data

    return (
        <ViewEventStyle>
            <h5>Let's set your appointment details</h5>
            <EventRow>
                <span className="label">Appointment</span>
                <p className="title">{getEventTitle(event)}</p>
            </EventRow>
            <EventRow>
                <span className="label">Date</span>
                <span className="title">{getDate(event.startTime)}</span>
            </EventRow>
            <EventRow>
                <span className="label">Haircut</span>
                <HaircutSelect haircutTypes={event.hairdresser.haircutTypes} />
            </EventRow>
            <EventRow>
                <span className="label">Shampoo</span>
                <ShampooSelect />
            </EventRow>
            <EventRow>
                <span className="label">Price</span>
                <span className="price">{formatMoney(price)}</span>
            </EventRow>
            <AddToCart id={event.id}>Book Now</AddToCart>
        </ViewEventStyle>
    )
}