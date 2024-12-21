import React from "react";
import {GetEvents} from "@/pages/event/components/Dashboard/GetEvents";

interface ListingProps {
    page: number
}

const List: React.FC<ListingProps> = ({page}: ListingProps) => {
    return (
        <GetEvents page={page} />
    )
}

export default List
