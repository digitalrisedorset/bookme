import React from "react";
import {useEventFilterState} from "@/state/EventFilterProvider";
import {capitalise} from "@/lib/string";
import {getDate} from "@/lib/date";
import {PreferenceSummaryStyle} from "@/pages/event/styles/SetEventDetail";

export const PreferenceSummary: React.FC = () => {
    const {eventFilter} = useEventFilterState()

    return (
        <PreferenceSummaryStyle>
            All our appointments with <strong>{capitalise(eventFilter.activeHairdresser)}</strong> in the week starting <strong>{getDate(eventFilter.activeWeek)}</strong>
        </PreferenceSummaryStyle>
    )
}