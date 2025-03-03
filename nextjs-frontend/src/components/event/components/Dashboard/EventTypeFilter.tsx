import {VenueStyle} from "@/components/venue/styles/VenueStyle";
import {Label} from "@/components/global/styles/Form";
import {useEventTypes} from "@/components/event/hooks/useEventTypes";
import React from "react";
import {EventType} from "@/components/event/types/event";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";
import {useUserPreferenceState} from "@/state/UserPreference";

export const EventTypeFilter: React.FC = () => {
    const {data} = useEventTypes()
    const {activeVenue} = useVenueConfigState()
    const {setEventType, userPreference} = useUserPreferenceState()

    const onEventTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEventType(e.target.value)
    };

    return (
        <VenueStyle>
            <fieldset>
                <Label>{tr('EventType', activeVenue)}</Label>
                <select onChange={onEventTypeChange} className="form-select" value={userPreference?.eventTypeId}>
                    <option value="">-</option>
                    {data?.eventTypes.map((item: EventType) => {
                        return (<option key={item.name} value={item.id}>{item.name}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}