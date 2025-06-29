import {useRouter} from "next/router";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";
import IntroDigitalRiseDorset from "@/components/venue/components/IntroDigitalRiseDorset";
import {initVenue} from "@/lib/venue";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'digital-rise-dorset')
    }, []);

    initVenue(router, useIsEventHost())

    return (
        <IntroDigitalRiseDorset />
    );
}