import React from "react";
import {DayGroupEvent, Hairdresser} from "@/pages/event/types/event";
import {getGroupEventHairdresserInfo} from "@/pages/event/models/DayGroupEvent";
import {useEventState} from "@/state/EventState";
import {capitalise} from "@/lib/string";
import {useHairdressers} from "@/pages/hairdresser/hooks/useHairdressers";

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
        {getGroupEventHairdresserInfo(eventGroup).map(({hairdresserId, eventId}: { hairdresserId: string, eventId: string }) => {
            const hairdresser = getHairdresserDetail(hairdresserId)

            return (
                <div key={getKey(eventGroup.startTime, hairdresserId)}>
                    <label htmlFor="hairdresser">{capitalise(hairdresser?.name)}</label>
                </div>
            )
        })}
    </div>
}