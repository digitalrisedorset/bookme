import {useHairdressers} from "@/components/hairdresser/hooks/useHairdressers";
import React from "react";
import {capitalise} from "@/lib/string";
import {HairdresserSelectionStyle} from "@/components/hairdresser/styles/Hairdresser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {Hairdresser} from "@/components/event/types/event";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";

export const HairdresserPreference: React.FC = () => {
    const {data, loading} = useHairdressers()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const onHairdresserChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user?.id, {'hairdresser': e.target.value})
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