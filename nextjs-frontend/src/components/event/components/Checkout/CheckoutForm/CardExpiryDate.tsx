import {
    CardExpiryElement
} from '@stripe/react-stripe-js';
import React from "react";
import {StripeElementsStyles} from "@/components/event/components/Checkout/CheckoutForm";

export const CardExpiryElementField: React.FC = () => {
    return (
        <>
            <label htmlFor="cardExpiry">Card Expiration</label>
            <CardExpiryElement id="cardExpiry" options={StripeElementsStyles} />
        </>
    );
}