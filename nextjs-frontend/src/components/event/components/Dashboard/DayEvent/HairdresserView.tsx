import React from "react";
import {DayGroupEvent, Hairdresser} from "@/components/event/types/event";
import {getGroupEventHairdresserInfo} from "@/components/event/models/DayGroupEvent";
import {useEventState} from "@/state/EventState";
import {capitalise} from "@/lib/string";
import {useHairdressers} from "@/components/hairdresser/hooks/useHairdressers";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const HairdresserView: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    const {data, loading} = useHairdressers()

    const getKey = (startTime: string, hairdresser: string) => {
        const date = new Date(startTime).getTime()

        return `${date}-${hairdresser}`
    }

    const getHairdresserDetail = (hairdresserId: string) => {
        const result = data?.hairdressers.filter((hairdresser: Hairdresser) => hairdresser.id === hairdresserId)
        return result[0]
    }

    return <div className="hairdresser-selection">
        {eventGroup.hairdressers.map(({eventId, hairdresserId}: { eventId: string, hairdresserId: string }) => {
            const hairdresser = getHairdresserDetail(hairdresserId)

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