import {VenueStyle} from "@/components/venue/styles/VenueStyle";
import {Label} from "@/components/global/styles/Form";
import React from "react";
import {useEventTypeGroups} from "@/components/event/hooks/useEventTypeGroups";
import {EventTypeGroup} from "@/components/event/types/event";
import {useUserPreferenceState} from "@/state/UserPreference";

export const EventTypeGroupFilter: React.FC = () => {
    const {data} = useEventTypeGroups()
    const {setEventTypeGroup, userPreference} = useUserPreferenceState()

    const onEventTypeGroupChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEventTypeGroup(e.target.value)
    };

    if (data?.venueEventTypeGroups.length === 1) return null

    return (
        <VenueStyle>
            <fieldset>
                <Label>Appointment Type</Label>
                <select onChange={onEventTypeGroupChange} className="form-select" value={userPreference?.eventTypeGroupId}>
                    <option value="">-</option>
                    {data?.venueEventTypeGroups.map((item: EventTypeGroup) => {
                        return (<option key={item.name} value={item.id}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}