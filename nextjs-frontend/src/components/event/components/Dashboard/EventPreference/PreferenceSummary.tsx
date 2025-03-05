import React from "react";
import {capitalise} from "@/lib/string";
import {getDate} from "@/lib/date";
import {PreferenceSummaryStyle} from "@/components/event/styles/SetEventDetail";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";
import {useUserPreferenceState} from "@/state/UserPreference";
import {useEventType} from "@/components/event/hooks/useEventType";
import {Loading} from "@/components/global/components/Loading";

export const PreferenceSummary: React.FC = () => {
    const {activeVenue} = useVenueConfigState()
    const {userPreference} = useUserPreferenceState()
    const {data, loading} = useEventType()

    if (loading) return <Loading />

    return (
        <PreferenceSummaryStyle>
            All our {tr('appointment', activeVenue)}s for <strong>{capitalise(data?.eventType?.name)}</strong> in the week starting <strong>{getDate(userPreference.weekPreference)}</strong>
        </PreferenceSummaryStyle>
    )
}