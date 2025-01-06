import React from "react";
import {EventRow, ViewEventStyle} from "@/pages/global/styles/ItemStyles";
import {HairdresserPreference} from "@/pages/hairdresser/components/HairdresserPreference";
import {WeekPreference} from "@/pages/event/components/Dashboard/EventPreference/WeekFilter";
import {HaircutTypePreference} from "@/pages/event/components/Dashboard/EventPreference/HaircutTypeReference";

export const InitFilter: React.FC = () => {
    return (
        <ViewEventStyle>
            <h5>Let's make this booking easy</h5>
            <EventRow>
                <span className="label">When do you need your haircut?</span>
                <WeekPreference />
            </EventRow>
            <EventRow>
                <p className="label">What haircut type do you need?</p>
                <HaircutTypePreference />
            </EventRow>
        </ViewEventStyle>
    )
}