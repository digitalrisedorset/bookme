import React from "react";
import {SelectStyle} from "@/components/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";
import {HaircutType} from "@/components/event/types/event";


interface HaircutProps {
    haircutTypes: HaircutType[]
}

export const HaircutSelect: React.FC<HaircutProps> = ({haircutTypes}: HaircutProps) => {
    const { setHaircutPreference} = useEventState()

    const handleSelect = (e: React.MouseEvent<HTMLInputElement>) => {
        //e.preventDefault();
        const input = e.target as HTMLInputElement
        setHaircutPreference(input.value)
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