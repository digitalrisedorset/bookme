import {Label} from "@/pages/global/styles/Form";
import {useHairdressers} from "@/pages/hairdresser/hooks/useHairdressers";
import {Hairdresser} from "@/pages/hairdresser/styles/Hairdresser";
import {KeystoneEvent} from "@/pages/event/types/event";
import React from "react";
import {capitalise} from "@/lib/string";

interface HairdresserSelectProps {
    event: KeystoneEvent
}

export const HairdresserSelect: React.FC<HairdresserSelectProps> = ({event}: HairdresserSelectProps) => {
    const {data, loading} = useHairdressers()

    const onHairdresserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()

    };

    if (loading) return null

    return (
        <Hairdresser>
            <fieldset>
                <Label>Hairdresser</Label>
                <select onChange={onHairdresserChange} className="form-select">
                    <option value="">-</option>
                    {data?.hairdressers.map((item) => {
                        return (<option key={item.name} value={item.name}>{capitalise(item.name)}</option>)
                    })}
                </select>
            </fieldset>
        </Hairdresser>
    )
}