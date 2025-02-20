import {useUser} from "@/components/user-authentication/hooks/useUser";

export function useIsEventHost(): boolean {
    const user = useUser();

    return user?.role?.isEventHost === true
}
