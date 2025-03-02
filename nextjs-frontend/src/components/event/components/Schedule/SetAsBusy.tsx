import React from "react";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {BookButton} from "@/components/global/styles/ItemStyles";
import {useRouter} from "next/router";
import {Loading} from "@/components/global/components/Loading";
import {useSetAsBusy} from "@/components/event/graphql/useChangeEventAvailability";

interface SetAsBusyProps {
    id: string
    children: React.ReactNode
}

export const SetAsBusy: React.FC<SetAsBusyProps> = ({id}: SetAsBusyProps) => {
    const user = useUser()
    const router = useRouter()
    const [updateEvent, { loading }] = useSetAsBusy(id)

    if (loading) return <Loading />
    if (!user) return null;

    async function handleClick(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        await updateEvent().catch(console.error);
        router.push({pathname: '/schedule'});
    }

    return (
        <BookButton>
            <button className="add-to-cart" type="button" onClick={handleClick}>
                Set Busy
            </button>
        </BookButton>
    );
}