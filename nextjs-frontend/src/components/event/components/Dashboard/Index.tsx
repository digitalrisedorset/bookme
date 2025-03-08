import {EventFilterStyles, ListHeader} from "@/components/event/styles/EventFilterStyles";
import React from "react";
import {WeekFilter} from "@/components/event/components/Dashboard/WeekFilter";
import {InitFilter} from "@/components/event/components/Dashboard/InitFilter";
import {ResetPreferenceFilter} from "@/components/event/components/Dashboard/EventPreference/ResetPreferenceFilter";
import {PreferenceSummary} from "@/components/event/components/Dashboard/EventPreference/PreferenceSummary";
import {EventTypeFilter} from "@/components/event/components/Dashboard/EventTypeFilter";
import {EventTypeGroupFilter} from "@/components/event/components/Dashboard/EventTypeGroupFilter";
import {EventDashboard} from "@/components/event/components/EventDashboard";
import {useUserPreferenceState} from "@/state/UserPreference";

export const Index: React.FC = () => {
    const {userPreference} = useUserPreferenceState()

    if (userPreference === undefined) return

    return (
        <>
            {(userPreference.weekPreference !== "" && userPreference.eventTypeId !== "") &&  (<>
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
            {(userPreference.weekPreference === "" || userPreference.eventTypeId === "") &&  (<>
                <InitFilter />
            </>)
            }
        </>
    )
}