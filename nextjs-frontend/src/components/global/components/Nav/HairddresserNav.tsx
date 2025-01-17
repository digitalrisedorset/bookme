import {useIsHairdresser} from "@/components/user-authentication/hooks/useUserRole";

export const HairddresserNav: React.FC = () => {
    if (!useIsHairdresser()) return null

    return (
        <>
            {/*<Link href="/book">Book</Link>*/}
        </>
    );
}