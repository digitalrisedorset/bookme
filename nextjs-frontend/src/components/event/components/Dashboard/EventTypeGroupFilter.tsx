import {VenueStyle} from "@/components/venue/styles/VenueStyle";
import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import React from "react";
import {useEventTypeGroups} from "@/components/event/hooks/useEventTypeGroups";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {EventTypeGroup} from "@/components/event/types/event";

export const EventTypeGroupFilter: React.FC = () => {
    const {data} = useEventTypeGroups()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    if (user?.id === undefined) return

    const onEventTypeGroupChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'eventTypeGroup': e.target.value})
        })
    };

    if (data?.venueEventTypeGroups.length === 1) return null

    return (
        <VenueStyle>
            <fieldset>
                <Label>Appointment Type</Label>
                <select onChange={onEventTypeGroupChange} className="form-select" value={user?.eventTypeGroup?.id}>
                    <option value="">-</option>
                    {data?.venueEventTypeGroups.map((item: EventTypeGroup) => {
                        return (<option key={item.name} value={item.id}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}