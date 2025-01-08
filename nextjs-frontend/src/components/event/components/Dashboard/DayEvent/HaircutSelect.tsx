import React from "react";
import {SelectStyle} from "@/components/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";

type HaircutType = {
    name: string
}

interface HaircutProps {
    haircutTypes: HaircutType[]
}

export const HaircutSelect: React.FC<HaircutProps> = ({haircutTypes}: HaircutProps) => {
    const { setHaircutPreference} = useEventState()

    const handleSelect = (e: React.FormEvent) => {
        //e.preventDefault();
        setHaircutPreference(e.target.value)
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