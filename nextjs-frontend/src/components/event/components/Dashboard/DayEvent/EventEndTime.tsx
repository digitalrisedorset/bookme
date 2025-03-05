import React from "react";
import {useEventPrice} from "@/components/event/hooks/useEventPrice";
import {formatMoney} from "@/lib/price";
import {useEventDuration} from "@/components/event/hooks/useEventDuration";
import {getTime} from "@/lib/date";

export const EventEndTime: React.FC = () => {
    const endTime = useEventDuration()

    return (
        <span className="title">{getTime(endTime)}</span>
    )
}