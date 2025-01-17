import {useUser} from "@/components/user-authentication/hooks/useUser";

export function useIsHairdresser(): boolean {
    const user = useUser();

    return user?.role?.isHairdresser === true
}
