import React from "react";
import {ResetPrefence} from "@/components/event/styles/SetEventDetail";
import {Label} from "@/components/global/styles/Form";
import {useEventTypeGroups} from "@/components/event/hooks/useEventTypeGroups";
import {EventPreferenceFilterType, PREFERENCE_RESET} from "@/components/event/types/event";
import {useUserPreferenceState} from "@/state/UserPreference";

export const ResetPreferenceFilter: React.FC = () => {
    const {data} = useEventTypeGroups()
    const {resetPreference} = useUserPreferenceState()

    const resetFilter = async () => {
        const preference: EventPreferenceFilterType = {
            'weekPreference': '',
            'eventType': PREFERENCE_RESET
        }
        if (data?.venueEventTypeGroups.length>1) {
            preference.eventTypeGroup = PREFERENCE_RESET
        }

        resetPreference()
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