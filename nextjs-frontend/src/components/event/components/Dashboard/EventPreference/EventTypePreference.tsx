import React from "react";
import {capitalise} from "@/lib/string";
import {EventHostSelectionStyle} from "@/components/eventHost/styles/EventHostStyle";
import {EventType} from "@/components/event/types/event";
import {useEventTypes} from "@/components/event/hooks/useEventTypes";
import {Loading} from "@/components/global/components/Loading";
import {PreferenceChoice} from "@/components/event/styles/EventFilterStyles";
import {useUserPreferenceState} from "@/state/UserPreference";

export const EventTypePreference: React.FC = () => {
    const {data, loading} = useEventTypes()
    const {setEventType} = useUserPreferenceState()

    const onEventHostChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        setEventType(input.value)
    };

    if (loading) return <Loading />

    return <EventHostSelectionStyle>
        {data?.eventTypes.map((eventType: EventType) => {
            return (
                <PreferenceChoice key={eventType.id}>
                    <input type="radio" id={eventType.name} name="eventHost" value={eventType.id} onClick={onEventHostChange} />
                    <label htmlFor={eventType.name}>{capitalise(eventType.name)}</label>
                </PreferenceChoice>
            )
        })}
    </EventHostSelectionStyle>
}