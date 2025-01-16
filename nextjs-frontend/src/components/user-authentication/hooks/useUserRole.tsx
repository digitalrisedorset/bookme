import {useUser} from "@/components/user-authentication/hooks/useUser";

export function isHairdresser(): Boolean | null {
    const user = useUser();

    return user?.role?.isHairdresser === true
}
