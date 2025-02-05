import React from "react";
import {DayGroupEvent, Hairdresser} from "@/components/event/types/event";
import {useEventState} from "@/state/EventState";
import {capitalise} from "@/lib/string";
import {useHairdressers} from "@/components/hairdresser/hooks/useHairdressers";
import {Loading} from "@/components/global/components/Loading";
import {Radio} from "@/components/global/components/Preference/Radio";
import {SelectStyle} from "@/components/global/styles/ItemStyles";

interface ListingProps {
    eventGroup: DayGroupEvent
}

export const HairdresserSelect: React.FC<ListingProps> = ({eventGroup}: ListingProps) => {
    const {eventState, toggleActiveEvent} = useEventState()
    const {data, loading} = useHairdressers()

    if (loading) return <Loading />

    const getHairdresserDetail = (hairdresserId: string) => {
        const result = data?.hairdressers.filter((hairdresser: Hairdresser) => hairdresser.id === hairdresserId)
        return result[0]
    }

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        toggleActiveEvent(e.target.value)
    }

    const updateSelect = () => {
        if (eventGroup.hairdressers.length === 1) {
            const firstMap = eventGroup.hairdressers[0]
            toggleActiveEvent(firstMap.eventId)
        }
    }

    updateSelect()

    return <SelectStyle>
        {eventGroup.hairdressers.map(({hairdresserId, eventId}: { hairdresserId: string, eventId: string }) => {
            const hairdresser = getHairdresserDetail(hairdresserId)

            return (
                <Radio key={`hairdresser-${eventId}`}
                       id={`hairdresser-${eventId}`}
                       name="hairdresser"
                       value={eventId}
                       checked={eventState.activeEventId === eventId}
                       onChange={handleSelect}
                       label={capitalise(hairdresser?.name)}
                />
            )
        })}
    </SelectStyle>
}