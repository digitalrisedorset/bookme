import React from "react";
import {ResetPrefence} from "@/components/event/styles/SetEventDetail";
import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {useEventTypeGroups} from "@/components/event/hooks/useEventTypeGroups";
import {EventPreferenceFilterType, PREFERENCE_RESET} from "@/components/event/types/event";

export const ResetPreferenceFilter: React.FC = () => {
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()
    const {data} = useEventTypeGroups()

    if (user === undefined) return

    const resetFilter = async () => {
        const preference: EventPreferenceFilterType = {
            'weekPreference': '',
            'eventType': PREFERENCE_RESET
        }
        if (data?.venueEventTypeGroups.length>1) {
            preference.eventTypeGroup = PREFERENCE_RESET
        }

        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, preference)
        })
    };

    return (
        <ResetPrefence>
            <fieldset>
                <Label></Label>
                <button className="reset-preference" type="button" onClick={resetFilter}>
                    Reset Preference
                </button>
            </fieldset>
        </ResetPrefence>
    )
}