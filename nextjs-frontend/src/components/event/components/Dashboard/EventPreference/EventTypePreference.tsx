import React from "react";
import {capitalise} from "@/lib/string";
import {EventHostSelectionStyle} from "@/components/eventHost/styles/EventHostStyle";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {EventType} from "@/components/event/types/event";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useEventTypes} from "@/components/event/hooks/useEventTypes";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {Loading} from "@/components/global/components/Loading";
import {PreferenceChoice} from "@/components/event/styles/EventFilterStyles";

export const EventTypePreference: React.FC = () => {
    const {data, loading} = useEventTypes()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    if (user?.id === undefined) return

    const onEventHostChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'eventType': input.value})
        })
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