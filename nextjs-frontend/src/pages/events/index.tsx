import {EventFilterStyles, ListHeader} from "@/components/event/styles/EventFilterStyles";
import React from "react";
import {WeekFilter} from "@/components/event/components/Dashboard/WeekFilter";
import {InitFilter} from "@/components/event/components/Dashboard/InitFilter";
import {ResetPreferenceFilter} from "@/components/event/components/Dashboard/EventPreference/ResetPreferenceFilter";
import {PreferenceSummary} from "@/components/event/components/Dashboard/EventPreference/PreferenceSummary";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {EventTypeFilter} from "@/components/event/components/Dashboard/EventTypeFilter";
import {EventTypeGroupFilter} from "@/components/event/components/Dashboard/EventTypeGroupFilter";
import {EventDashboard} from "@/components/event/components/EventDashboard";

export default function Events() {
    const user = useUser()

    if (!user) return null

    return (
        <>
            {(user.weekPreference !== '' && user.eventType !== null) &&  (<>
                <ListHeader>
                    <EventFilterStyles>
                        <WeekFilter/>
                        <EventTypeGroupFilter />
                        <EventTypeFilter />
                        <ResetPreferenceFilter/>
                    </EventFilterStyles>
                    <PreferenceSummary />
                    <EventDashboard />
                </ListHeader>
            </>)
            }
            {(user.weekPreference === '' || user.eventType === null) &&  (<>
                <InitFilter />
            </>)
            }
        </>
    )
}