import React from "react";
import {GetEvents} from "@/pages/event/components/Dashboard/GetEvents";
import {Pagination} from "@/pages/event/components/Dashboard/Pagination";

interface ListingProps {
    page: number
}

const List: React.FC<ListingProps> = ({page}: ListingProps) => {
    return (
        <GetEvents page={page} />
    )
}

export default List
