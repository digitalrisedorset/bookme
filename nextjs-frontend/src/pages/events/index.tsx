import {EventFilterStyles, ListHeader} from "@/pages/event/styles/EventFilterStyles";
import React from "react";
import {HairdresserFilter} from "@/pages/hairdresser/components/HairdresserFilter";
import {WeekFilter} from "@/pages/event/components/Dashboard/WeekFilter";
import {GetWeekEvents} from "@/pages/event/components/Dashboard/GetWeekEvents";
import {useEventFilterState} from "@/state/EventFilterProvider";
import {InitFilter} from "@/pages/event/components/Dashboard/InitFilter";
import {ResetPreferenceFilter} from "@/pages/event/components/Dashboard/EventPreference/ResetPreferenceFilter";
import {PreferenceSummary} from "@/pages/event/components/Dashboard/EventPreference/PreferenceSummary";

export default function Events() {
    const {eventFilter} = useEventFilterState()

    console.log('eventFilter', eventFilter)

    return (
        <>
            {(eventFilter.activeWeek !== '' && eventFilter.activeHairdresser !== '') &&  (<>
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
            {(eventFilter.activeWeek === '' || eventFilter.activeHairdresser === '') &&  (<>
                <InitFilter />
            </>)
            }
        </>
    )
}