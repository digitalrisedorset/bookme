import {EventFilterStyles, ListHeader} from "@/components/event/styles/EventFilterStyles";
import React from "react";
import {WeekFilter} from "@/components/event/components/Dashboard/WeekFilter";
import {GetWeekEvents} from "@/components/event/components/Dashboard/GetWeekEvents";
import {InitFilter} from "@/components/event/components/Dashboard/InitFilter";
import {ResetPreferenceFilter} from "@/components/event/components/Dashboard/EventPreference/ResetPreferenceFilter";
import {PreferenceSummary} from "@/components/event/components/Dashboard/EventPreference/PreferenceSummary";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {HaircutTypeFilter} from "@/components/event/components/Dashboard/HaircutTypeFilter";
import {HaircutTypeGroupFilter} from "@/components/event/components/Dashboard/HaircutTypeGroupFilter";

export default function Events() {
    const user = useUser()

    if (!user) return null

    return (
        <>
            {(user.weekPreference !== '' && user.haircutType !== null) &&  (<>
                <ListHeader>
                    <EventFilterStyles>
                        <WeekFilter/>
                        <HaircutTypeGroupFilter />
                        <HaircutTypeFilter />
                        <ResetPreferenceFilter/>
                    </EventFilterStyles>
                    <PreferenceSummary />
                    <GetWeekEvents/>
                </ListHeader>
            </>)
            }
            {(user.weekPreference === '' || user.haircutType === null) &&  (<>
                <InitFilter />
            </>)
            }
        </>
    )
}