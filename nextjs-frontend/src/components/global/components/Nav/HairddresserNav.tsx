import {useIsEventHost} from "@/components/user-authentication/hooks/useUserRole";

export const HairddresserNav: React.FC = () => {
    if (!useIsEventHost()) return null

    return (
        <>
            {/*<Link href="/book">Book</Link>*/}
        </>
    );
}