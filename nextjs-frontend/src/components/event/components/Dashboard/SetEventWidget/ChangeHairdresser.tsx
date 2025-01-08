import {DayGroupEvent} from "@/components/event/types/event";
import React from "react";
import {ChangeButtonStyle, ChangeEventStyle} from "@/components/event/styles/SetEventDetail";

interface ChangeEventProps {
    event: DayGroupEvent
}

export const ChangeHairdresser: React.FC<ChangeEventProps> = ({eventGroup}: ChangeEventProps) => {
    return (
        <ChangeEventStyle>
            {/*<p>{eventGroup.hairdresser.name}*/}
            {/*    <ChangeButtonStyle>Change</ChangeButtonStyle>*/}
            {/*</p>*/}
        </ChangeEventStyle>
    )
}