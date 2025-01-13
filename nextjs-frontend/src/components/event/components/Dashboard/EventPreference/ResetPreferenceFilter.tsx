import React from "react";
import {ResetPrefence} from "@/components/event/styles/SetEventDetail";
import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";

export const ResetPreferenceFilter: React.FC = () => {
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const resetFilter = async () => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user?.id, {
                'weekPreference': '',
                'haircutType': null,
                'haircutTypeGroup': null
            })
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