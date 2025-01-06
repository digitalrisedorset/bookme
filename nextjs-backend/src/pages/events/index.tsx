import {EventFilterStyles, ListHeader} from "@/pages/event/styles/EventFilterStyles";
import React from "react";
import {HairdresserFilter} from "@/pages/hairdresser/components/HairdresserFilter";
import {WeekFilter} from "@/pages/event/components/Dashboard/WeekFilter";
import {GetWeekEvents} from "@/pages/event/components/Dashboard/GetWeekEvents";

export default function Events() {
    return (
        <ListHeader>
            <EventFilterStyles>
                <WeekFilter/>
                <HairdresserFilter/>
            </EventFilterStyles>
            <GetWeekEvents/>
        </ListHeader>
    )
}