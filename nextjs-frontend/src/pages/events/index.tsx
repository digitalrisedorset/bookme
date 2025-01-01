import {EventFilterStyles, ListHeader} from "@/pages/event/styles/EventFilterStyles";
import React from "react";
import {HairdresserFilter} from "@/pages/hairdresser/components/HairdresserFilter";
import {WeekFilter} from "@/pages/event/components/Dashboard/WeekFilter";
import {GetWeekEvents} from "@/pages/event/components/Dashboard/GetWeekEvents";
import {InitFilter} from "@/pages/event/components/Dashboard/InitFilter";
import {ResetPreferenceFilter} from "@/pages/event/components/Dashboard/EventPreference/ResetPreferenceFilter";
import {PreferenceSummary} from "@/pages/event/components/Dashboard/EventPreference/PreferenceSummary";
import {useUser} from "@/pages/user-authentication/hooks/useUser";

export default function Events() {
    const user = useUser()

    if (!user) return null

    return (
        <>
            {(user.weekPreference !== '' && user.hairdresser !== '') &&  (<>
                <ListHeader>
                    <EventFilterStyles>
                        <WeekFilter/>
                        <HairdresserFilter/>
                        <ResetPreferenceFilter/>
                    </EventFilterStyles>
                    <PreferenceSummary />
                    <GetWeekEvents/>
                </ListHeader>
            </>)
            }
            {(user.weekPreference === '' || user.hairdresser === '') &&  (<>
                <InitFilter />
            </>)
            }
        </>
    )
}