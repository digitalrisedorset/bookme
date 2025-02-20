import {VenueStyle} from "@/components/venue/styles/VenueStyle";
import {Label} from "@/components/global/styles/Form";
import {useEventTypes} from "@/components/event/hooks/useEventTypes";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import React from "react";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {EventType} from "@/components/event/types/event";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";

export const EventTypeFilter: React.FC = () => {
    const {data} = useEventTypes()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()
    const {activeVenue} = useVenueConfigState()

    if (user?.id === undefined) return

    const onEventTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'eventType': e.target.value})
        })
    };

    return (
        <VenueStyle>
            <fieldset>
                <Label>{tr('EventType', activeVenue)}</Label>
                <select onChange={onEventTypeChange} className="form-select" value={user?.eventType?.id}>
                    <option value="">-</option>
                    {data?.eventTypes.map((item: EventType) => {
                        return (<option key={item.name} value={item.id}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}