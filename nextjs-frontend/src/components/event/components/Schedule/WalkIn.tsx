import React from "react";
import {useAddToCart} from "@/components/event/graphql/useAddToCart";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getEventCartQty} from "@/lib/cart";
import {BookButton} from "@/components/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";
import {useRouter} from "next/router";
import {useWalkIn} from "@/components/event/graphql/useWalkInEvent";

interface WalkInProps {
    id: string
}

export const WalkIn: React.FC<WalkInProps> = ({id}: WalkInProps) => {
    const user = useUser()
    const router = useRouter()
    const [updateEvent, { loading }] = useWalkIn(id)

    if (!user) return null;

    async function handleClick(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        await updateEvent().catch(console.error);
        router.push({pathname: '/schedule'});
    }

    return (
        <BookButton>
            <button className="add-to-cart" type="button" onClick={handleClick}>
                Walk-In 🛒
            </button>
        </BookButton>
    );
}