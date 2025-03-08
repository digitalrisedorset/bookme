import React from "react";
import {DayGroupEvent, EventHost} from "@/components/event/types/event";
import {useEventState} from "@/state/EventState";
import {capitalise} from "@/lib/string";
import {useEventHosts} from "@/components/eventHost/hooks/useEventHosts";
import {Loading} from "@/components/global/components/Loading";
import {Radio} from "@/components/global/components/Preference/Radio";
import {SelectStyle} from "@/components/global/styles/ItemStyles";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const EventHostSelect: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    const {eventState, toggleActiveEvent} = useEventState()
    const {data, loading} = useEventHosts()

    if (loading) return <Loading />

    const getEventHostDetail = (eventHostId: string) => {
        const result = data?.eventHosts.filter((eventHost: EventHost) => eventHost.id === eventHostId)
        return result[0]
    }

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        toggleActiveEvent(e.target.value)
    }

    return <SelectStyle>
        {eventGroup.eventHosts.map(({eventHostId, eventId}: { eventHostId: string, eventId: string }) => {
            const eventHost = getEventHostDetail(eventHostId)

            return (
                <Radio key={`eventHost-${eventId}`}
                       id={`eventHost-${eventId}`}
                       name="eventHost"
                       value={eventId}
                       checked={eventState.activeEventId === eventId}
                       onChange={handleSelect}
                       label={capitalise(eventHost?.name)}
                />
            )
        })}
    </SelectStyle>
}