import React from "react";
import {NoWorkingDayStyles} from "@/components/event/styles/EventFilterStyles";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";

export const NoDayEventList: React.FC = () => {
    const {activeVenue} = useVenueConfigState()

    return (
        <NoWorkingDayStyles>
            <>{tr('Not a working day', activeVenue)}</>
        </NoWorkingDayStyles>
    )
}