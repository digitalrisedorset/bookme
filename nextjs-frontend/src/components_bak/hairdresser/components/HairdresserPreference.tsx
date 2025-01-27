import {useHairdressers} from "@/components/hairdresser/hooks/useHairdressers";
import React from "react";
import {capitalise} from "@/lib/string";
import {HairdresserSelectionStyle} from "@/components/hairdresser/styles/Hairdresser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {Hairdresser} from "@/components/event/types/event";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {Loading} from "@/components/global/components/Loading";

export const HairdresserPreference: React.FC = () => {
    const {data, loading} = useHairdressers()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    if (user === undefined) return

    const onHairdresserChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'hairdresser': input.value})
        })
    };

    if (loading) return <Loading />

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