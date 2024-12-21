import React from "react";
import {CheckoutFormStyles, SickButton} from "@/pages/event/styles/Checkout";
import nProgress from 'nprogress';

import {
    CardElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import {useCheckout} from "@/pages/event/graphql/useCheckout";
import {useCart} from "@/state/CartState";
import {useRouter} from "next/router";
import {Stripe} from "@stripe/stripe-js/dist/stripe-js/stripe";

export const CheckoutForm: React.FC = () => {
    const stripe = useStripe() as Stripe;
    const elements = useElements();
    const router = useRouter();
    const { closeCart } = useCart();
    const [checkout] = useCheckout()

    if (stripe === null) return

    async function handleSubmit(e: React.FormEvent) {
        // 1. Stop the form from submitting and turn the loader one
        e.preventDefault();
        console.log('We gotta do some work..');
        // 2. Start the page transition
        nProgress.start();
        // 3. Create the payment method via stripe (Token comes back here if successful)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        console.log(paymentMethod);
        // 4. Handle any errors from stripe
        if (error) {
            nProgress.done();
            return; // stops the checkout from happening
        }
        // 5. Send the token from step 3 to our keystone server, via a custom mutation!
        const order = await checkout({
            variables: {
                token: paymentMethod.id,
            },
        });
        console.log(`Finished with the order!!`);
        console.log(order);
        // 6. Change the page to view the order
        router.push({
            pathname: `/order/[id]`,
            query: {
                id: order.data.checkout.id,
            },
        });
        // 7. Close the cart
        closeCart();

        // 8. turn the loader off
        nProgress.done();
    }

    return (<CheckoutFormStyles onSubmit={handleSubmit}>
        <CardElement />
        <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>)
}