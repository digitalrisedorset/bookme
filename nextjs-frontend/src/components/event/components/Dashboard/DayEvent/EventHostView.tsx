import React from "react";
import {DayGroupEvent, GroupEventEventHostMap} from "@/components/event/types/event";
import {capitalise} from "@/lib/string";
import {getEventHostDetail, useEventHosts} from "@/components/eventHost/hooks/useEventHosts";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {Loading} from "@/components/global/components/Loading";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const EventHostView: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    const {data, loading} = useEventHosts()
    const config = useConfig()

    const getKey = (startTime: string, eventHost: string) => {
        const date = new Date(startTime).getTime()

        return `${date}-${eventHost}`
    }

    if (loading) return <Loading />
    if (!config.showEventHostOnEvent)  return null

    return <div className="eventHost-selection">
        {eventGroup.eventHosts.map(({eventId, eventHostId}: GroupEventEventHostMap) => {
            const eventHost = getEventHostDetail(data?.eventHosts, eventHostId)

            if (eventGroup.cartEvent && eventGroup.cartEvent.id!== eventId) return null
            if (eventGroup.orderedEventId === eventId) return null

            return (
                <div key={getKey(eventGroup.startTime, eventHostId)}>
                    <label htmlFor="eventHost">{capitalise(eventHost?.name)}</label>
                </div>
            )
        })}
    </div>
}