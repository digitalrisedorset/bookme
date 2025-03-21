import {useRouter} from "next/router";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";
import IntroQichen from "@/components/venue/components/IntroQichen";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'qichen-restaurant')
    }, []);

    if (useIsEventHost()) {
        router.push({pathname: `/schedule`});
    } else {
        router.push({pathname: `/`});
    }

    return (
        <IntroQichen />
    );
}