import {EventFilterStyles, ListHeader} from "@/pages/event/styles/EventFilterStyles";
import React from "react";
import {WeekFilter} from "@/pages/event/components/Dashboard/WeekFilter";
import {GetWeekEvents} from "@/pages/event/components/Dashboard/GetWeekEvents";
import {InitFilter} from "@/pages/event/components/Dashboard/InitFilter";
import {ResetPreferenceFilter} from "@/pages/event/components/Dashboard/EventPreference/ResetPreferenceFilter";
import {PreferenceSummary} from "@/pages/event/components/Dashboard/EventPreference/PreferenceSummary";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {HaircutTypeFilter} from "@/pages/event/components/Dashboard/HaircutTypeFilter";

export default function Events() {
    const user = useUser()

    if (!user) return null

    return (
        <>
            {(user.weekPreference !== '' && user.haircutType !== null) &&  (<>
                <ListHeader>
                    <EventFilterStyles>
                        <WeekFilter/>
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