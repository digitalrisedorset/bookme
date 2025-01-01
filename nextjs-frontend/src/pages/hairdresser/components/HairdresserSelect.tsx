import {Label} from "@/pages/global/styles/Form";
import {useHairdressers} from "@/pages/hairdresser/hooks/useHairdressers";
import {Hairdresser} from "@/pages/hairdresser/styles/Hairdresser";
import {KeystoneEvent} from "@/pages/event/types/event";
import React from "react";
import {capitalise} from "@/lib/string";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/pages/user-authentication/graphql/useUserPreference";
import {usePreferenceVariables} from "@/pages/user-authentication/hooks/usePreference";

interface HairdresserSelectProps {
    event: KeystoneEvent
}

export const HairdresserSelect: React.FC<HairdresserSelectProps> = ({event}: HairdresserSelectProps) => {
    const {data, loading} = useHairdressers()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const onHairdresserChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: usePreferenceVariables(user?.id, {'hairdresser': e.target.value})
        })
    };

    if (loading) return null

    return (
        <Hairdresser>
            <fieldset>
                <Label>Hairdresser</Label>
                <select onChange={onHairdresserChange} className="form-select">
                    <option value="">-</option>
                    {data?.hairdressers.map((item) => {
                        return (<option key={item.name} value={item.name}>{capitalise(item.name)}</option>)
                    })}
                </select>
            </fieldset>
        </Hairdresser>
    )
}