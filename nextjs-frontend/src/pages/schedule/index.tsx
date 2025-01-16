import {EventFilterStyles, ListHeader} from "@/components/event/styles/EventFilterStyles";
import React from "react";
import {WeekFilter} from "@/components/event/components/Dashboard/WeekFilter";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {GetWeekEvents} from "@/components/event/components/Schedule/GetWeekEvents";

export default function Events() {
    const user = useUser()

    if (!user) return null

    return (
        <ListHeader>
            <EventFilterStyles>
                <WeekFilter/>
            </EventFilterStyles>
            <GetWeekEvents/>
        </ListHeader>
    )
}