import React from "react";
import {ResetPrefence} from "@/pages/event/styles/SetEventDetail";
import {Label} from "@/pages/global/styles/Form";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/pages/user-authentication/graphql/useUserPreference";
import {usePreferenceVariables} from "@/pages/user-authentication/hooks/usePreference";

export const ResetPreferenceFilter: React.FC = () => {
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const resetFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: usePreferenceVariables(user?.id, {
                'weekPreference': '',
                'hairdresser': null
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