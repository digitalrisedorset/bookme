import React from "react";
import {capitalise} from "@/lib/string";
import {getDate} from "@/lib/date";
import {PreferenceSummaryStyle} from "@/components/event/styles/SetEventDetail";
import {useUser} from "@/components/user-authentication/hooks/useUser";

export const PreferenceSummary: React.FC = () => {
    const user = useUser()

    if (user === undefined) return

    return (
        <PreferenceSummaryStyle>
            All our appointments with <strong>{capitalise(user.haircutType?.name)}</strong> in the week starting <strong>{getDate(user.weekPreference)}</strong>
        </PreferenceSummaryStyle>
    )
}