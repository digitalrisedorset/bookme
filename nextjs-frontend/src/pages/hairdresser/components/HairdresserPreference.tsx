import {useHairdressers} from "@/pages/hairdresser/hooks/useHairdressers";
import React from "react";
import {capitalise} from "@/lib/string";
import {HairdresserSelectionStyle} from "@/pages/hairdresser/styles/Hairdresser";
import {useWeekPreference} from "@/pages/user-authentication/graphql/useUserPreference";
import {Hairdresser} from "@/pages/event/types/event";
import {usePreferenceVariables} from "@/pages/user-authentication/hooks/usePreference";
import {useUser} from "@/pages/user-authentication/hooks/useUser";

export const HairdresserPreference: React.FC = () => {
    const {data, loading} = useHairdressers()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const onHairdresserChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: usePreferenceVariables(user?.id, {'hairdresser': e.target.value})
        })
    };

    if (loading) return null

    return <HairdresserSelectionStyle>
        {data?.hairdressers.map((hairdresser: Hairdresser) => {
            return (
                <div key={hairdresser.id}>
                    <input type="radio" id={hairdresser.name} name="hairdresser" value={hairdresser.id} onClick={onHairdresserChange} />
                    <label htmlFor="hairdresser">{capitalise(hairdresser.name)}</label>
                </div>
            )
        })}
    </HairdresserSelectionStyle>
}