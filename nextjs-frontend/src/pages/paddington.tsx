import {useRouter} from "next/router";
import IntroMadisson from "@/components/venue/components/IntroMadisson";
import {isHairdresser} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        localStorage.setItem(ACTIVE_VENUE_KEY, 'paddington-hairdressing')
    }, []);

    // if (isHairdresser()) {
    //     router.push({pathname: `/schedule`});
    // } else {
    //     router.push({pathname: `/`});
    // }

    return (
        <IntroMadisson />
    );
}
