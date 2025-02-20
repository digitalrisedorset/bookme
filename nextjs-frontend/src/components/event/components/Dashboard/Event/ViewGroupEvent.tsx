import React from "react";
import {EventRow, ViewGroupEventStyle} from "@/components/global/styles/ItemStyles";
import {getTime} from "@/lib/date";
import {useEventGroup} from "@/components/event/hooks/useEventGroup";
import {AddToCart} from "@/components/event/components/Dashboard/Event/AddToCart";
import {ShampooSelect} from "@/components/event/components/Dashboard/Event/ShampooSelect";
import {getEventTitle} from "@/lib/groupEvent";
import {useEventPrice} from "@/components/event/hooks/useEventPrice";
import {formatMoney} from "@/lib/price";
import {GroupEventHandler} from "@/components/event/models/GroupEvent";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {EventHostSelect} from "@/components/event/components/Dashboard/DayEvent/EventHostSelect";
import {useEventState} from "@/state/EventState";
import {useEventDuration} from "@/components/event/hooks/useEventDuration";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {Loading} from "@/components/global/components/Loading";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";

interface ViewGroupEventProps {
    eventIds: string[]
}

export const ViewGroupEvent: React.FC<ViewGroupEventProps> = ({eventIds}: ViewGroupEventProps) => {
    const { data, loading } = useEventGroup(eventIds)
    const {eventState} = useEventState()
    const user = useUser()
    const price  = useEventPrice()
    const endTime = useEventDuration()
    const config = useConfig()
    const {activeVenue} = useVenueConfigState()

    if (loading) return <Loading />

    if (!user) return null

    const eventHandler = new GroupEventHandler(user)
    const groupEvent = eventHandler.getGroupEvent(data.events)

    return (
        <ViewGroupEventStyle>
            <h5>Let&apos;s set your {tr('appointment', activeVenue)} details</h5>
            <EventRow>
                <span className="label">Appointment</span>
                <p className="title">{getEventTitle(groupEvent)}</p>
            </EventRow>
            <EventRow>
                <span className="label">{tr('EventType', activeVenue)}</span>
                <span className="title">{groupEvent.eventType}</span>
            </EventRow>
            <EventRow>
                <span className="label">{tr('EventHost', activeVenue)}</span>
                <EventHostSelect eventGroup={groupEvent} />
            </EventRow>
            {config.offerShampoo &&<EventRow>
                <span className="label">Shampoo</span>
                <ShampooSelect />
            </EventRow>}
            <EventRow>
                <span className="label">End Time</span>
                <span className="title">{getTime(endTime)}</span>
            </EventRow>
            <EventRow>
                <span className="label">Price</span>
                <span className="price">{formatMoney(price)}</span>
            </EventRow>
            <AddToCart id={eventState.activeEventId || ''}>Book Now</AddToCart>
        </ViewGroupEventStyle>
    )
}