import React from "react";
import {GetWeekEvents} from "@/components/event/components/Dashboard/GetWeekEvents";

interface ListingProps {
    page: number
}

const List: React.FC<ListingProps> = () => {
    return (
        <GetWeekEvents />
    )
}

export default List
