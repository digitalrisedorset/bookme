import {useRouter} from "next/router";
import {ViewEvent} from "@/components/event/components/Schedule/ViewEvent";
import {sanitiseString} from "@/lib/string";

export default function EventPage() {
    const {query} = useRouter();

    const eventId = sanitiseString(query.id);

    if (!eventId) return

    return (
        <ViewEvent eventId={eventId} />
    )
}