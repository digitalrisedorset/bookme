import React from "react";
import {useEventPrice} from "@/components/event/hooks/useEventPrice";
import {formatMoney} from "@/lib/price";

export const EventPrice: React.FC = () => {
    const price  = useEventPrice()

    return (
        <span className="price">{formatMoney(price)}</span>
    )
}