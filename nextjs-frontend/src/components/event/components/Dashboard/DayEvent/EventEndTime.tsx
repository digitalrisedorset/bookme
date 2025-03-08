import React from "react";
import {useEventDuration} from "@/components/event/hooks/useEventDuration";
import {getTime} from "@/lib/date";

export const EventEndTime: React.FC = () => {
    const endTime = useEventDuration()

    return (
        <span className="title">{getTime(endTime)}</span>
    )
}