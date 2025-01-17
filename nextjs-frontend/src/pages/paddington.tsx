import {useRouter} from "next/router";
import {isHairdresser} from "@/components/user-authentication/hooks/useUserRole";
import {useEffect} from "react";
import {ACTIVE_VENUE_KEY} from "@/components/venue/types/venue";
import IntroPaddington from "@/components/venue/components/IntroPaddington";

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
        <IntroPaddington />
    );
}
