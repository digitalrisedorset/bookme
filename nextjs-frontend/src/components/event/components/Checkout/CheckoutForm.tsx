import React, {useState} from "react";
import {CheckoutFormStyles, SickButton} from "@/components/event/styles/Checkout";
import nProgress from 'nprogress';

import {
    CardElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import {useCheckout} from "@/components/event/graphql/useCheckout";
import {useCart} from "@/state/CartState";
import {useRouter} from "next/router";
import {Stripe, StripeError} from "@stripe/stripe-js/dist/stripe-js/stripe";
import {PaymentMethod} from "@stripe/stripe-js";

interface IPaymentMethod {
    error?: StripeError | undefined;
    paymentMethod?: PaymentMethod | undefined;
}

export const CheckoutForm: React.FC = () => {
    const stripe = useStripe() as Stripe;
    const elements = useElements();
    const router = useRouter();
    const { closeCart } = useCart();
    const [checkout] = useCheckout()

    const [width] = useState(window.innerWidth);

    const StripeElementsStyles = {
        style: {
            base: {
                iconColor: 'black',
                color: 'black',
                fontWeight: 300,
                fontFamily: "'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif",
                fontSize: (width<600)? '12px': '18px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {
                    color: '#fce883',
                },
                '::placeholder': {
                    color: 'grey',
                },
            },
            invalid: {
                iconColor: 'red',
                color: 'red',
            },
        },
    }

    if (stripe === null) return

    async function handleSubmit(e: React.FormEvent) {
        // 1. Stop the form from submitting and turn the loader one
        e.preventDefault();

        // 2. Start the page transition
        nProgress.start();

        const cardElement = elements?.getElement(CardElement);
        if (!cardElement) {
            return;
        }

        // 3. Create the payment method via stripe (Token comes back here if successful)
        const { error, paymentMethod }: IPaymentMethod = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });

        // 4. Handle any errors from stripe
        if (error) {
            nProgress.done();
            return; // stops the checkout from happening
        }
        // 5. Send the token from step 3 to our keystone server, via a custom mutation!
        // @ts-expect-error bypass stripe check as this is an old version of stripe
        const order = await checkout({
            variables: {
                token: paymentMethod?.id,
            },
        });

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
        <p>Enter your card details below</p>
        <CardElement options={StripeElementsStyles} />
        <SickButton>Submit</SickButton>
    </CheckoutFormStyles>)
}