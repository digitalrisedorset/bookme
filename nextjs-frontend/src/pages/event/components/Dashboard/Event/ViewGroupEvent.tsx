import React, {useEffect} from "react";
import {EventRow, ViewGroupEventStyle} from "@/pages/global/styles/ItemStyles";
import {getDate} from "@/lib/date";
import {HaircutSelect} from "@/pages/event/components/Dashboard/DayEvent/HaircutSelect";
import {useEventGroup} from "@/pages/event/hooks/useEventGroup";
import {AddToCart} from "@/pages/event/components/Dashboard/Event/AddToCart";
import {ShampooSelect} from "@/pages/event/components/Dashboard/Event/ShampooSelect";
import {getEventTitle} from "@/lib/groupEvent";
import {useEventPrice} from "@/pages/event/hooks/useEventPrice";
import {formatMoney} from "@/lib/price";
import {GroupEventHandler} from "@/pages/event/models/GroupEvent";
import {WeekEvents} from "@/pages/event/components/Dashboard/WeekEvents";
import {NoEvent} from "@/pages/event/components/Dashboard/NoEvent";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {HairdresserSelect} from "@/pages/event/components/Dashboard/DayEvent/HairdresserSelect";
import {useEventState} from "@/state/EventState";

interface ViewGroupEventProps {
    eventIds: string[]
}

export const ViewGroupEvent: React.FC<ViewGroupEventProps> = ({eventIds}: ViewGroupEventProps) => {
    const { data, loading } = useEventGroup(eventIds)
    const {activeEvent} = useEventState()
    const user = useUser()
    const price  = useEventPrice()

    if (!user) return null

    if (loading || !data?.events) return <>Loading</>

    const eventHandler = new GroupEventHandler(user)
    const groupEvent = eventHandler.getGroupEvent(data.events)

    return (
        <ViewGroupEventStyle>
            <h5>Let's set your appointment details</h5>
            <EventRow>
                <span className="label">Appointment</span>
                <p className="title">{getEventTitle(groupEvent)}</p>
            </EventRow>
            <EventRow>
                <span className="label">Date</span>
                <span className="title">{getDate(groupEvent.startTime)}</span>
            </EventRow>
            <EventRow>
                <span className="label">Haircut</span>
                <p>{groupEvent.haircutType}</p>
            </EventRow>
            <EventRow>
                <span className="label">Hairdresser</span>
                <HairdresserSelect eventGroup={groupEvent} />
            </EventRow>
            <EventRow>
                <span className="label">Shampoo</span>
                <ShampooSelect />
            </EventRow>
            <EventRow>
                <span className="label">Price</span>
                <span className="price">{formatMoney(price)}</span>
            </EventRow>
            <AddToCart id={activeEvent}>Book Now</AddToCart>
        </ViewGroupEventStyle>
    )
}