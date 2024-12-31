import React from "react";
import {useAddToCart} from "@/pages/event/graphql/useAddToCart";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {getEventCartQty} from "@/lib/cart";
import {BookButton} from "@/pages/global/styles/ItemStyles";
import {useEventState} from "@/state/EventState";

interface AddToCartProps {
    id: string
}

export const AddToCart: React.FC<AddToCartProps> = ({id}: AddToCartProps) => {
    const user = useUser()
    const {haircut, shampoo} = useEventState()
    const [addToCart, { loading }] = useAddToCart(id);

    const isEventInCart = () => {
        if (getEventCartQty(user?.cartItems, id)>0) {
            return "true"
        }

        return "false"
    }

    if (!user) return null;

    async function handleClick(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        if (haircut == '') {
            alert('You need to select a haircut style')
            return
        }
        await addToCart().catch(console.error);
    }

    return (
        <BookButton incart={isEventInCart()}>
            <div className="in-cart">
                <p>You&apos;re in!</p>
            </div>
            <button className="add-to-cart" disabled={loading | isEventInCart()} type="button" onClick={handleClick}>
                Book{loading && 'ing'} 🛒
            </button>
        </BookButton>
    );
}