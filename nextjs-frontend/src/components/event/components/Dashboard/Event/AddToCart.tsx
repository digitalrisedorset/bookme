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
    children: React.ReactNode
}

export const AddToCart: React.FC<AddToCartProps> = ({id}: AddToCartProps) => {
    const user = useUser()
    const {eventState} = useEventState()
    const router = useRouter()
    const [addToCart, { loading }] = useAddToCart(id);

    const isEventInCart = (): string => {
        if (user && (id!=='') && getEventCartQty(user.cartItems, [id])>0) {
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
        if (id === '') {
            alert('Select a eventHost for your appointment')
        }

        if (user === null) {
            router.push({pathname: '/signin'})
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
        </BookButton>
    );
}