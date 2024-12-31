import {useHairdressers} from "@/pages/hairdresser/hooks/useHairdressers";
import React from "react";
import {capitalise} from "@/lib/string";
import {HairdresserSelectionStyle} from "@/pages/hairdresser/styles/Hairdresser";
import {useEventFilterState} from "@/state/EventFilterProvider";

export const HairdresserPreference: React.FC = () => {
    const {data, loading} = useHairdressers()
    const {setActiveHairdresser} = useEventFilterState()

    const onHairdresserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveHairdresser(e.target.value)
    };

    if (loading) return null

    return <HairdresserSelectionStyle>
        {data?.hairdressers.map((hairdresser: any) => {
            return (
                <div key={hairdresser.name}>
                    <input type="radio" id={hairdresser.name} name="hairdresser" value={hairdresser.name} onClick={onHairdresserChange} />
                    <label htmlFor="hairdresser">{capitalise(hairdresser.name)}</label>
                </div>
            )
        })}
    </HairdresserSelectionStyle>
}