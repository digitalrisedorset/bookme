import {useHairdressers} from "@/pages/hairdresser/hooks/useHairdressers";
import React from "react";
import {capitalise} from "@/lib/string";
import {HairdresserSelectionStyle} from "@/pages/hairdresser/styles/Hairdresser";
import {useWeekPreference} from "@/pages/user-authentication/graphql/useUserPreference";
import {HaircutType, Hairdresser} from "@/pages/event/types/event";
import {usePreferenceVariables} from "@/pages/user-authentication/hooks/usePreference";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {useHaircutTypes} from "@/pages/event/hooks/useHaircutTypes";

export const HaircutTypePreference: React.FC = () => {
    const {data, loading} = useHaircutTypes()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const onHairdresserChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: usePreferenceVariables(user?.id, {'haircutType': e.target.value})
        })
    };

    if (loading) return null

    return <HairdresserSelectionStyle>
        {data?.haircutTypes.map((haircut: HaircutType) => {
            return (
                <div key={haircut.id}>
                    <input type="radio" id={haircut.name} name="hairdresser" value={haircut.id} onClick={onHairdresserChange} />
                    <label htmlFor="hairdresser">{capitalise(haircut.name)}</label>
                </div>
            )
        })}
    </HairdresserSelectionStyle>
}