import {Venue} from "@/components/venue/styles/Venue";
import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import React from "react";
import {useHaircutTypeGroups} from "@/components/event/hooks/useHaircutTypeGroups";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";

export const HaircutTypeGroupFilter: React.FC = () => {
    const {data} = useHaircutTypeGroups()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const onHaircutTypeGroupChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user?.id, {'haircutTypeGroup': e.target.value})
        })
    };

    if (data?.haircutTypeGroups.length === 1) return null

    return (
        <Venue>
            <fieldset>
                <Label>Haircut type</Label>
                <select onChange={onHaircutTypeGroupChange} className="form-select" value={user?.haircutTypeGroup?.id}>
                    <option value="">-</option>
                    {data?.haircutTypeGroups.map((item) => {
                        return (<option key={item.name} value={item.id}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}