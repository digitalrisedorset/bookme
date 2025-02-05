import React from "react";
import {PreferenceChoice} from "@/components/event/styles/EventFilterStyles";
import {OPTION_SELECTED} from "@/components/event/types/event";

interface RadioProps {
    selected: OPTION_SELECTED | ''
    id: string
    name: string
    value: string
    checked: boolean
    onChange: (e: any) => void
    label: string
}

export const Radio: React.FC<RadioProps> = ({selected, id, name, value, checked, onChange, label}: RadioProps) => {
    return <PreferenceChoice selected={checked?OPTION_SELECTED:''} key={id}>
        <input type="radio" id={id} name={name}
               value={value}
               checked={checked}
               onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
    </PreferenceChoice>
}