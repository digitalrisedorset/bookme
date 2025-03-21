import {useRouter} from "next/router";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";
import IntroDateMate from "@/components/venue/components/IntroDateMate";
import {initVenue} from "@/lib/venue";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'date-mate')
    }, []);

    initVenue(router, useIsEventHost())

    return (
        <IntroDateMate />
    );
}
