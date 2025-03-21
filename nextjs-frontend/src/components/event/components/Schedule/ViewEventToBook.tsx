import React from "react";
import {EventRow, ViewGroupEventStyle} from "@/components/global/styles/ItemStyles";
import {getEventTitle} from "@/lib/groupEvent";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useEvent} from "@/components/event/hooks/useEvent";
import {WalkIn} from "@/components/event/components/Schedule/WalkIn";
import {SetAsBusy} from "@/components/event/components/Schedule/SetAsBusy";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";

interface ViewEventProps {
    eventId: string
}

export const ViewEventToBook: React.FC<ViewEventProps> = ({eventId}: ViewEventProps) => {
    const { data, loading } = useEvent(eventId)
    const user = useUser()
    const {activeVenue} = useVenueConfigState()

    if (!user) return null

    if (loading || !data?.event) return <>Loading</>

    return (
        <ViewGroupEventStyle>
            <h5>{tr('Let&apos;s set your appointment details', activeVenue)}</h5>
            <EventRow>
                <span className="label">Appointment</span>
                <p className="title">{getEventTitle(data?.event)}</p>
            </EventRow>
            <div className="actions">
                <WalkIn id={eventId}>Walk-In</WalkIn>
                <SetAsBusy id={eventId}>Set Unavailable</SetAsBusy>
            </div>
        </ViewGroupEventStyle>
    )
}