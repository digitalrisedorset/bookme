import {Venue} from "@/components/venue/styles/Venue";
import {Label} from "@/components/global/styles/Form";
import {useHaircutTypes} from "@/components/event/hooks/useHaircutTypes";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import React from "react";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {HaircutType} from "@/components/event/types/event";

export const HaircutTypeFilter: React.FC = () => {
    const {data} = useHaircutTypes()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    if (user?.id === undefined) return

    const onHaircutTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'haircutType': e.target.value})
        })
    };

    return (
        <Venue>
            <fieldset>
                <Label>Haircut type</Label>
                <select onChange={onHaircutTypeChange} className="form-select" value={user?.haircutType?.id}>
                    <option value="">-</option>
                    {data?.haircutTypes.map((item: HaircutType) => {
                        return (<option key={item.name} value={item.id}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </Venue>
    )
}