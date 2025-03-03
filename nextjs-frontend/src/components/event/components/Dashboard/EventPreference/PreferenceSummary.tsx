import React from "react";
import {capitalise} from "@/lib/string";
import {getDate} from "@/lib/date";
import {PreferenceSummaryStyle} from "@/components/event/styles/SetEventDetail";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";
import {useUserPreferenceState} from "@/state/UserPreference";

export const PreferenceSummary: React.FC = () => {
    //const user = useUser()
    const {activeVenue} = useVenueConfigState()
    const {userPreference} = useUserPreferenceState()

    //if (user === undefined) return

    return (
        <PreferenceSummaryStyle>
            All our {tr('appointment', activeVenue)}s for <strong>{capitalise(userPreference.eventType?.name)}</strong> in the week starting <strong>{getDate(userPreference.weekPreference)}</strong>
        </PreferenceSummaryStyle>
    )
}