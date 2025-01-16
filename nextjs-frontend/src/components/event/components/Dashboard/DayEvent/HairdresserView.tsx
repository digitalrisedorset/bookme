import React from "react";
import {DayGroupEvent} from "@/components/event/types/event";
import {capitalise} from "@/lib/string";
import {getHairdresserDetail, useHairdressers} from "@/components/hairdresser/hooks/useHairdressers";
import {useConfig} from "@/components/venue/hooks/useConfig";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const HairdresserView: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    const {data, loading} = useHairdressers()
    const config = useConfig()

    const getKey = (startTime: string, hairdresser: string) => {
        const date = new Date(startTime).getTime()

        return `${date}-${hairdresser}`
    }

    if (!config.showHairdresserOnEvent)  return null

    return <div className="hairdresser-selection">
        {eventGroup.hairdressers.map(({eventId, hairdresserId}: { eventId: string, hairdresserId: string }) => {
            const hairdresser = getHairdresserDetail(data?.hairdressers, hairdresserId)

            if (eventGroup.cartEvent && eventGroup.cartEvent.id!== eventId) return null
            if (eventGroup.orderedEventId === eventId) return null

            return (
                <div key={getKey(eventGroup.startTime, hairdresserId)}>
                    <label htmlFor="hairdresser">{capitalise(hairdresser?.name)}</label>
                </div>
            )
        })}
    </div>
}