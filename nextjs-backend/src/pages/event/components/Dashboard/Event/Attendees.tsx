import React from "react";

interface AttendeesProps {
    registered: number
    capacity: number
}

export const Attendees: React.FC<AttendeesProps> = ({registered, capacity}: AttendeesProps) => {
    const getNumberPlaceLeft = () => {
        return capacity - registered
    }

    return (<span className="capacity">{getNumberPlaceLeft()} places left</span>)
}