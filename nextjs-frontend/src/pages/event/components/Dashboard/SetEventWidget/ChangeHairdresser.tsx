import {DayGroupEvent} from "@/pages/event/types/event";
import React from "react";
import {ChangeButtonStyle, ChangeEventStyle} from "@/pages/event/styles/SetEventDetail";

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