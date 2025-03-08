import React, {useState} from "react";
import {useAddToCart} from "@/components/event/graphql/useAddToCart";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getEventCartQty} from "@/lib/cart";
import {BookButton} from "@/components/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";
import {useRouter} from "next/router";
import {BOOKED_EVENT} from "@/components/event/types/event";
import {SignInOrRegister} from "@/components/user-authentication/components/SignInOrRegister";

interface AddToCartProps {
    children: React.ReactNode
}

export const AddToCart: React.FC<AddToCartProps> = () => {
    const user = useUser()
    const {eventState} = useEventState()
    const router = useRouter()
    const [addToCart, { loading }] = useAddToCart();
    const [useReady, setUserReady] = useState(false)

    const isEventInCart = (): string => {
        if (eventState.activeEventId === undefined) {
            return ''
        }

        if (user && (eventState.activeEventId!=='') && getEventCartQty(user.cartItems, [eventState.activeEventId])>0) {
            return BOOKED_EVENT
        }

        return ''
    }

    const isEventReady = () => {
        if (loading===true || isEventInCart()!=='' || eventState.activeEventId==undefined) {
            return false
        }

        return true
    }

    async function handleClick(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        if (eventState.activeEventId === '') {
            alert('Select a eventHost for your appointment')
        }

        if (user === null) {
            setUserReady(true)
            return
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
            {!user && useReady && <SignInOrRegister />}
        </BookButton>
    );
}