import {VenueStyle} from "@/components/venue/styles/VenueStyle";
import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import React from "react";
import {useHaircutTypeGroups} from "@/components/event/hooks/useHaircutTypeGroups";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {HaircutTypeGroup} from "@/components/event/types/event";

export const HaircutTypeGroupFilter: React.FC = () => {
    const {data} = useHaircutTypeGroups()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    if (user?.id === undefined) return

    const onHaircutTypeGroupChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'haircutTypeGroup': e.target.value})
        })
    };

    if (data?.venueHaircutTypeGroups.length === 1) return null

    return (
        <VenueStyle>
            <fieldset>
                <Label>Appointment Type</Label>
                <select onChange={onHaircutTypeGroupChange} className="form-select" value={user?.haircutTypeGroup?.id}>
                    <option value="">-</option>
                    {data?.venueHaircutTypeGroups.map((item: HaircutTypeGroup) => {
                        return (<option key={item.name} value={item.id}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}