import React from "react";
import {capitalise} from "@/lib/string";
import {getDate} from "@/lib/date";
import {PreferenceSummaryStyle} from "@/components/event/styles/SetEventDetail";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";

export const PreferenceSummary: React.FC = () => {
    const user = useUser()
    const {activeVenue} = useVenueConfigState()

    if (user === undefined) return

    return (
        <PreferenceSummaryStyle>
            All our {tr('appointment', activeVenue)}s for <strong>{capitalise(user.haircutType?.name)}</strong> in the week starting <strong>{getDate(user.weekPreference)}</strong>
        </PreferenceSummaryStyle>
    )
}