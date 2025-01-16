import Link from "next/link";
import {isHairdresser} from "@/components/user-authentication/hooks/useUserRole";

export const HairddresserNav: React.FC = () => {
    if (!isHairdresser()) return null

    return (
        <>
            {/*<Link href="/book">Book</Link>*/}
        </>
    );
}