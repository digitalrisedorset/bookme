import React from "react";
import {ResetPrefence} from "@/components/event/styles/SetEventDetail";
import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {useHaircutTypeGroups} from "@/components/event/hooks/useHaircutTypeGroups";

export const ResetPreferenceFilter: React.FC = () => {
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()
    const {data} = useHaircutTypeGroups()

    const resetFilter = async () => {
        const preference = {
            'weekPreference': '',
            'haircutType': null
        }
        if (data?.haircutTypeGroups>1) {
            preference['haircutTypeGroup'] = null
        }
        await updateUserPreference({
            variables: getUserPreferenceVariables(user?.id, preference)
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