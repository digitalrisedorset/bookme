import {Venue} from "@/pages/venue/styles/Venue";
import {Label} from "@/pages/global/styles/Form";
import {useHaircutTypes} from "@/pages/event/hooks/useHaircutTypes";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/pages/user-authentication/graphql/useUserPreference";
import React from "react";
import {usePreferenceVariables} from "@/pages/user-authentication/hooks/usePreference";

export const HaircutTypeFilter: React.FC = () => {
    const {data} = useHaircutTypes()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const onHaircutTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: usePreferenceVariables(user?.id, {'haircutType': e.target.value})
        })
    };

    return (
        <Venue>
            <fieldset>
                <Label>Haircut type</Label>
                <select onChange={onHaircutTypeChange} className="form-select" value={user?.haircutType?.id}>
                    <option value="">-</option>
                    {data?.haircutTypes.map((item) => {
                        return (<option key={item.name} value={item.id}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}