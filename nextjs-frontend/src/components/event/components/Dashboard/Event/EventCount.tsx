import React from "react";

interface EventCountProps {
    count: number
}

export const EventCount: React.FC<EventCountProps> = ({count}: EventCountProps) => {

    return (<span className="cart-qty">{count}</span>)
}