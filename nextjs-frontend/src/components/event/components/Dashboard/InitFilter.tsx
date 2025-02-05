import React from "react";
import {EventRow, ViewEventStyle} from "@/components/global/styles/ItemStyles";
import {WeekPreference} from "@/components/event/components/Dashboard/EventPreference/WeekFilter";
import {
    HaircutTypeGroupPreference
} from "@/components/event/components/Dashboard/EventPreference/HaircutTypeGroupReference";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceStep} from "@/lib/user";
import {HaircutTypePreference} from "@/components/event/components/Dashboard/EventPreference/HaircutTypePreference";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";

export const InitFilter: React.FC = () => {
    const user = useUser()
    const {activeVenue} = useVenueConfigState()

    if (user === undefined) return

    const preferenceStep = getUserPreferenceStep(user)

    return (
        <ViewEventStyle>
            <h5>Let&apos;s make this booking easy</h5>
            {preferenceStep==='Week' &&<EventRow>
                <span className="label">When do you need your haircut?</span>
                <WeekPreference />
            </EventRow>}
            {preferenceStep==='HaircutGroup' &&<EventRow>
                <p className="label">Select a category that match your appointment?</p>
                <HaircutTypeGroupPreference />
            </EventRow>}
            {preferenceStep==='HaircutType' &&<EventRow>
                <p className="label">{tr('What haircut type do you need?', activeVenue)}</p>
                <HaircutTypePreference />
            </EventRow>}
        </ViewEventStyle>
    )
}