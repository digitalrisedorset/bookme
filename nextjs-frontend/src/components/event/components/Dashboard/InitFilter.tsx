import React from "react";
import {EventRow, ViewEventStyle} from "@/components/global/styles/ItemStyles";
import {WeekPreference} from "@/components/event/components/Dashboard/EventPreference/WeekFilter";
import {HaircutTypePreference} from "@/components/event/components/Dashboard/EventPreference/HaircutTypeReference";
import {
    HaircutTypeGroupPreference
} from "@/components/event/components/Dashboard/EventPreference/HaircutTypeGroupReference";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceStep} from "@/lib/user";

export const InitFilter: React.FC = () => {
    const user = useUser()
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
                <p className="label">What haircut type do you need?</p>
                <HaircutTypePreference />
            </EventRow>}
        </ViewEventStyle>
    )
}