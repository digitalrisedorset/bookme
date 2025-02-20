import {Label} from "@/components/global/styles/Form";
import {useEventHosts} from "@/components/eventHost/hooks/useEventHosts";
import {EventHostStyle} from "@/components/eventHost/styles/EventHostStyle";
import {capitalise} from "@/lib/string";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useWeekPreference} from "@/components/user-authentication/graphql/useUserPreference";
import React from "react";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {EventHost} from "@/components/event/types/event";

export const EventHostFilter: React.FC = () => {
    const {data} = useEventHosts()
    const user = useUser()
    const [updateUserPreference] = useWeekPreference()

    if (user === undefined) return

    const onEventHostChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'eventHost': e.target.value}),
        })
    };

    return (
        <EventHostStyle>
            <fieldset>
                <Label>EventHost Filter</Label>
                <select onChange={onEventHostChange} className="form-select" value={user?.eventHost?.id}>
                    <option value="">-</option>
                    {data?.eventHosts.map((item: EventHost) => {
                        return (<option key={item.name} value={item.id}>{capitalise(item.name)}</option>)
                    })}
                </select>
            </fieldset>
        </EventHostStyle>
    )
}