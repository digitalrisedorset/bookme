import React from "react";
import {useEventFilterState} from "@/state/EventFilterProvider";
import {ResetPrefence} from "@/pages/event/styles/SetEventDetail";
import {Label} from "@/pages/global/styles/Form";

export const ResetPreferenceFilter: React.FC = () => {
    const {resetFilter} = useEventFilterState()

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