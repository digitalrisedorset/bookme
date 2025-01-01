import {Label} from "@/pages/global/styles/Form";
import {useHairdressers} from "@/pages/hairdresser/hooks/useHairdressers";
import {Hairdresser} from "@/pages/hairdresser/styles/Hairdresser";
import {capitalise} from "@/lib/string";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/pages/user-authentication/graphql/useUserPreference";
import React from "react";
import {usePreferenceVariables} from "@/pages/user-authentication/hooks/usePreference";

export const HairdresserFilter: React.FC = () => {
    const {data} = useHairdressers()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const onHairdresserChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: usePreferenceVariables(user?.id, {'hairdresser': e.target.value})
        })
    };

    return (
        <Hairdresser>
            <fieldset>
                <Label>Hairdresser Filter</Label>
                <select onChange={onHairdresserChange} className="form-select" value={user?.hairdresser?.id}>
                    <option value="">-</option>
                    {data?.hairdressers.map((item) => {
                        return (<option key={item.name} value={item.id}>{capitalise(item.name)}</option>)
                    })}
                </select>
            </fieldset>
        </Hairdresser>
    )
}