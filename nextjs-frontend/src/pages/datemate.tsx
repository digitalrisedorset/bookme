import {useRouter} from "next/router";
import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";
import IntroDateMate from "@/components/venue/components/IntroDateMate";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'date-mate')
    }, []);

    if (useIsEventHost()) {
        router.push({pathname: `/schedule`});
    } else {
        router.push({pathname: `/`});
    }

    return (
        <IntroDateMate />
    );
}
