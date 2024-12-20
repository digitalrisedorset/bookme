import List from "@/pages/global/components/Event/List";
import {VenueFilter} from "@/pages/venue/components/VenueFilter";
import {EventTypeFilter} from "@/pages/event/components/Dashboard/EventTypeFilter";
import {DayFilter} from "@/pages/event/components/Dashboard/DayFilter";
import {EventFilterStyles, ListHeader} from "@/pages/event/styles/EventFilterStyles";
import {useRouter} from "next/router";
import {Pagination} from "@/pages/event/components/Dashboard/Pagination";
import React from "react";

export default function Events() {
    const { query } = useRouter();
    const page = parseInt(query.page) || 1;

    return (
        <>
            <ListHeader>
                <EventFilterStyles>
                    <VenueFilter />
                    <EventTypeFilter />
                    <DayFilter />
                </EventFilterStyles>
                <Pagination page={page} />
            </ListHeader>
            <List page={page} />
        </>
    )
}