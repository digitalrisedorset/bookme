import React from "react";
import {EventRow, ViewEventStyle} from "@/components/global/styles/ItemStyles";
import {WeekPreference} from "@/components/event/components/Dashboard/EventPreference/WeekFilter";
import {
    EventTypeGroupPreference
} from "@/components/event/components/Dashboard/EventPreference/EventTypeGroupReference";
import {getUserPreferenceStep} from "@/lib/user";
import {EventTypePreference} from "@/components/event/components/Dashboard/EventPreference/EventTypePreference";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";
import {useUserPreferenceState} from "@/state/UserPreference";

export const InitFilter: React.FC = () => {
    const {userPreference} = useUserPreferenceState()
    const {activeVenue} = useVenueConfigState()

    const preferenceStep = getUserPreferenceStep(userPreference)

    return (
        <ViewEventStyle>
            <h5>Let&apos;s make this booking easy</h5>
            {preferenceStep==='Week' &&<EventRow>
                <span className="label">When do you need your {tr('eventType', activeVenue)}?</span>
                <WeekPreference />
            </EventRow>}
            {preferenceStep==='EventTypeGroup' &&<EventRow>
                <p className="label">Select a category that match your appointment?</p>
                <EventTypeGroupPreference />
            </EventRow>}
            {preferenceStep==='EventType' &&<EventRow>
                <p className="label">{tr('What eventType type do you need?', activeVenue)}</p>
                <EventTypePreference />
            </EventRow>}
        </ViewEventStyle>
    )
}