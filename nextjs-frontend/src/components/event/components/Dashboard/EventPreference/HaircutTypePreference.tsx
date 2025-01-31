import React from "react";
import {capitalise} from "@/lib/string";
import {HairdresserSelectionStyle} from "@/components/hairdresser/styles/HairdresserStyle";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {HaircutType} from "@/components/event/types/event";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useHaircutTypes} from "@/components/event/hooks/useHaircutTypes";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {Loading} from "@/components/global/components/Loading";
import {PreferenceChoice} from "@/components/event/styles/EventFilterStyles";

export const HaircutTypePreference: React.FC = () => {
    const {data, loading} = useHaircutTypes()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    if (user?.id === undefined) return

    const onHairdresserChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'haircutType': input.value})
        })
    };

    if (loading) return <Loading />

    return <HairdresserSelectionStyle>
        {data?.haircutTypes.map((haircut: HaircutType) => {
            return (
                <PreferenceChoice key={haircut.id}>
                    <input type="radio" id={haircut.name} name="hairdresser" value={haircut.id} onClick={onHairdresserChange} />
                    <label htmlFor={haircut.name}>{capitalise(haircut.name)}</label>
                </PreferenceChoice>
            )
        })}
    </HairdresserSelectionStyle>
}