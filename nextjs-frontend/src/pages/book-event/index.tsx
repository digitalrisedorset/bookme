import {useRouter} from "next/router";
import React from "react";
import {ViewEventToBook} from "@/components/event/components/Schedule/ViewEventToBook";

export default function Events() {
    const { query } = useRouter();
    const router = useRouter()

    if (query.eventId === undefined) {
        router.push({pathname: '/schedule'});
        return
    }

    const eventId = query.eventId;

    return (
        <>
            <ViewEventToBook eventId={eventId} />
        </>
    )
}