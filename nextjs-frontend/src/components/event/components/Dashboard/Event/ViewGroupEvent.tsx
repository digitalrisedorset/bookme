import React from "react";
import {EventRow, ViewGroupEventStyle} from "@/components/global/styles/ItemStyles";
import {useEventGroup} from "@/components/event/hooks/useEventGroup";
import {AddToCart} from "@/components/event/components/Dashboard/Event/AddToCart";
import {ShampooSelect} from "@/components/event/components/Dashboard/Event/ShampooSelect";
import {getEventTitle} from "@/lib/groupEvent";
import {GroupEventHandler} from "@/components/event/models/GroupEvent";
import {EventHostSelect} from "@/components/event/components/Dashboard/DayEvent/EventHostSelect";
import {EventStateProvider} from "@/state/EventState";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {Loading} from "@/components/global/components/Loading";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";
import {useUserPreferenceState} from "@/state/UserPreference";
import {useEventType} from "@/components/event/hooks/useEventType";
import {EventPrice} from "@/components/event/components/Dashboard/DayEvent/EventPrice";
import {EventEndTime} from "@/components/event/components/Dashboard/DayEvent/EventEndTime";

interface ViewGroupEventProps {
    eventIds: string[]
}

export const ViewGroupEvent: React.FC<ViewGroupEventProps> = ({eventIds}: ViewGroupEventProps) => {
    const { data, loading } = useEventGroup(eventIds)
    const config = useConfig()
    const {activeVenue} = useVenueConfigState()
    const {userPreference} = useUserPreferenceState()
    const { eventType, loadingEventType } = useEventType()

    if (loading || loadingEventType) return <Loading />

    const eventHandler = new GroupEventHandler(userPreference, eventType)
    const groupEvent = eventHandler.getGroupEvent(data.events)

    return (
        <EventStateProvider eventGroup={groupEvent}>
            <ViewGroupEventStyle>
                <h5>{tr("Let's set your appointment details", activeVenue)}</h5>
                <EventRow>
                    <span className="label">{tr('Appointment', activeVenue)}</span>
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
                    <EventEndTime />
                </EventRow>
                {config.showPrice && <EventRow>
                    <span className="label">Price</span>
                    <EventPrice />
                </EventRow>}
                <AddToCart>Book Now</AddToCart>
            </ViewGroupEventStyle>
        </EventStateProvider>
    )
}