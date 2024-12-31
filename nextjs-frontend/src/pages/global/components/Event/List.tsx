import React from "react";
import {GetWeekEvents} from "@/pages/event/components/Dashboard/GetWeekEvents";

interface ListingProps {
    page: number
}

const List: React.FC<ListingProps> = () => {
    return (
        <GetWeekEvents />
    )
}

export default List
