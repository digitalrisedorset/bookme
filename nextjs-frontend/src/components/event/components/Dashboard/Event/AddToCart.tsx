import React from "react";
import {useAddToCart} from "@/components/event/graphql/useAddToCart";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getEventCartQty} from "@/lib/cart";
import {BookButton} from "@/components/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";
import {useRouter} from "next/router";
import {BOOKED_EVENT} from "@/components/event/types/event";

interface AddToCartProps {
    id: string
}

export const AddToCart: React.FC<AddToCartProps> = ({id}: AddToCartProps) => {
    const user = useUser()
    const {eventState} = useEventState()
    const {shampoo} = useEventState()
    const router = useRouter()
    const [addToCart, { loading }] = useAddToCart(id);

    const isEventInCart = () => {
        if ((id!=='') && getEventCartQty(user?.cartItems, [id])>0) {
            return BOOKED_EVENT
        }
    }

    const isEventReady = () => {
        if (loading | isEventInCart() | eventState.activeEventId==undefined) {
            return false
        }

        return true
    }

    if (!user) return null;

    async function handleClick(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        if (id === '') {
            alert('Select a hairdresser for your appointment')
        }

        await addToCart().catch(console.error);
        router.push({pathname: '/events'});
    }

    return (
        <BookButton status={isEventInCart()}>
            <div className="in-cart">
                <p>You&apos;re in!</p>
            </div>
            <button className="add-to-cart" disabled={!isEventReady()} type="button" onClick={handleClick}>
                Book{loading && 'ing'} 🛒
            </button>
        </BookButton>
    );
}