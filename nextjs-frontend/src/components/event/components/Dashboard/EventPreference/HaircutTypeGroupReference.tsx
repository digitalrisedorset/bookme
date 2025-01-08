import React from "react";
import {capitalise} from "@/lib/string";
import {HairdresserSelectionStyle} from "@/components/hairdresser/styles/Hairdresser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {HaircutTypeGroup} from "@/components/event/types/event";
import {usePreferenceVariables} from "@/components/user-authentication/hooks/usePreference";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useHaircutTypeGroups} from "@/components/event/hooks/useHaircutTypeGroups";

export const HaircutTypeGroupPreference: React.FC = () => {
    const {data, loading} = useHaircutTypeGroups()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    const onHaircutGroupChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: usePreferenceVariables(user?.id, {'haircutTypeGroup': e.target.value})
        })
    };

    if (loading) return null

    return <HairdresserSelectionStyle>
        {data?.haircutTypeGroups.map((haircutGroup: HaircutTypeGroup) => {
            return (
                <div key={haircutGroup.id}>
                    <input type="radio" id={haircutGroup.name} name="hairdresser" value={haircutGroup.id} onClick={onHaircutGroupChange} />
                    <label htmlFor="hairdresser">{capitalise(haircutGroup.name)}</label>
                </div>
            )
        })}
    </HairdresserSelectionStyle>
}