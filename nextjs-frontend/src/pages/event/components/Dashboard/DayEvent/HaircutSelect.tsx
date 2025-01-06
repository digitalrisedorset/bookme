import React from "react";
import {SelectStyle} from "@/pages/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";
import {useEventPrice} from "@/pages/event/hooks/useEventPrice";

type HaircutType = {
    name: string
}

interface HaircutProps {
    haircutTypes: HaircutType[]
}

export const HaircutSelect: React.FC<HaircutProps> = ({haircutTypes}: HaircutProps) => {
    const { activeEvent, setHaircutEvent} = useEventState()

    const price = useEventPrice(activeEvent)

    const handleSelect = (e: React.FormEvent) => {
        //e.preventDefault();
        setHaircutEvent(e.target.value)
    }

    return <SelectStyle>
        {haircutTypes.map((haircut: HaircutType) => {
            return (
                <div key={haircut.name}>
                    <input type="radio" id={haircut.id} name="haircut" value={haircut.id} onClick={handleSelect}/>
                    <label htmlFor="haircut">{haircut.name}</label>
                </div>
            )
        })}
    </SelectStyle>
}