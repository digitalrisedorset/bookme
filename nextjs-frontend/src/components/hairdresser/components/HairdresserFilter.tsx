import {Label} from "@/components/global/styles/Form";
import {useHairdressers} from "@/components/hairdresser/hooks/useHairdressers";
import {Hairdresser} from "@/components/hairdresser/styles/Hairdresser";
import {capitalise} from "@/lib/string";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import React from "react";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";

export const HairdresserFilter: React.FC = () => {
    const {data} = useHairdressers()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const onHairdresserChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user?.id, {'hairdresser': e.target.value}),
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