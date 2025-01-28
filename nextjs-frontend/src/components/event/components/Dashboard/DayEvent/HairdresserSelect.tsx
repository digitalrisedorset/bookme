import React from "react";
import {DayGroupEvent, Hairdresser} from "@/components/event/types/event";
import {useEventState} from "@/state/EventState";
import {capitalise} from "@/lib/string";
import {useHairdressers} from "@/components/hairdresser/hooks/useHairdressers";
import {Loading} from "@/components/global/components/Loading";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const HairdresserSelect: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    const {toggleActiveEvent} = useEventState()
    const {data, loading} = useHairdressers()

    if (loading) return <Loading />

    const getKey = (startTime: string, hairdresser: string) => {
        const date = new Date(startTime).getTime()

        return `${date}-${hairdresser}`
    }

    const getHairdresserDetail = (hairdresserId: string) => {
        const result = data?.hairdressers.filter((hairdresser: Hairdresser) => hairdresser.id === hairdresserId)
        return result[0]
    }

    const eventSelected = () => {
        if (eventGroup.hairdressers.length === 1) {
            const firstEvent = eventGroup.hairdressers[0]
            toggleActiveEvent(firstEvent.eventId)

            return firstEvent.eventId
        }

        return null
    }

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        toggleActiveEvent(e.target.value)
    }

    return <div className="hairdresser-selection">
        {eventGroup.hairdressers.map(({hairdresserId, eventId}: { hairdresserId: string, eventId: string }) => {
            const hairdresser = getHairdresserDetail(hairdresserId)

            return (
                <div key={getKey(eventGroup.startTime, hairdresserId)}>
                    <input type="radio" name="hairdresser" value={eventId} defaultChecked={eventSelected() === eventId} onChange={handleSelect} />
                    <label htmlFor="hairdresser">{capitalise(hairdresser?.name)}</label>
                </div>
            )
        })}
    </div>
}