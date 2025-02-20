import React from "react";
import {capitalise} from "@/lib/string";
import {EventHostSelectionStyle} from "@/components/eventHost/styles/EventHostStyle";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {EventTypeGroup} from "@/components/event/types/event";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useEventTypeGroups} from "@/components/event/hooks/useEventTypeGroups";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {Loading} from "@/components/global/components/Loading";
import {PreferenceChoice} from "@/components/event/styles/EventFilterStyles";

export const EventTypeGroupPreference: React.FC = () => {
    const {data, loading} = useEventTypeGroups()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    if (user === undefined) return

    const onEventTypeGroupChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'eventTypeGroup': input.value})
        })
    };

    if (loading) return <Loading />

    return <EventHostSelectionStyle>
        {data?.venueEventTypeGroups.map((eventTypeGroup: EventTypeGroup) => {
            return (
                <PreferenceChoice key={eventTypeGroup.id}>
                    <input type="radio" id={eventTypeGroup.name} name="eventHost" value={eventTypeGroup.id} onClick={onEventTypeGroupChange} />
                    <label htmlFor={eventTypeGroup.name}>{capitalise(eventTypeGroup.name)}</label>
                </PreferenceChoice>
            )
        })}
    </EventHostSelectionStyle>
}