import {useEventHosts} from "@/components/eventHost/hooks/useEventHosts";
import React from "react";
import {capitalise} from "@/lib/string";
import {EventHostSelectionStyle} from "@/components/eventHost/styles/EventHostStyle";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {EventHost} from "@/components/event/types/event";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {Loading} from "@/components/global/components/Loading";

export const EventHostPreference: React.FC = () => {
    const {data, loading} = useEventHosts()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    if (user === undefined) return

    const onEventHostChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'eventHost': input.value})
        })
    };

    if (loading) return <Loading />

    return <EventHostSelectionStyle>
        {data?.eventHosts.map((eventHost: EventHost) => {
            return (
                <div key={eventHost.id}>
                    <input type="radio" id={eventHost.name} name="eventHost" value={eventHost.id} onClick={onEventHostChange} />
                    <label htmlFor="eventHost">{capitalise(eventHost.name)}</label>
                </div>
            )
        })}
    </EventHostSelectionStyle>
}