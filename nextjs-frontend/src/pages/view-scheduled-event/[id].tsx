import {useRouter} from "next/router";
import {ViewEvent} from "@/components/event/components/Schedule/ViewEvent";

export default function EventPage() {
    const router = useRouter();
    const eventId = router.query.id ?? '';

    return (
        <ViewEvent eventId={eventId} />
    )
}