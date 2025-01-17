import {useOrder} from "@/components/order/graphql/useOrder";
import {ErrorMessage} from "@/components/global/components/ErrorMessage";
import {formatMoney} from "@/lib/price";
import OrderStyles from "@/components/order/styles/OrderStyles";
import Head from 'next/head';
import {useRouter} from "next/router";
import {Form} from "@/components/global/styles/Form";
import {getOrderNumber} from "@/lib/order";
import {Loading} from "@/components/global/components/Loading";
import React from "react";

export default function OrderPage() {
    const router = useRouter();
    const orderId = router.query.id ?? '';

    const { data, error, loading } = useOrder(orderId);

    if (loading) return <Loading />
    if (error) return <ErrorMessage error={error} />;
    const { order } = data;

    return (
        <OrderStyles>
            <Head>
                <title>Your order - {order.orderReference}</title>
            </Head>
            <Form>
                <h2>Your order summary</h2>
                <ErrorMessage/>
                <fieldset>
                    <label htmlFor="order_reference">
                        Order reference
                    </label>
                    <span className="order-reference">{order.orderReference}</span>
                </fieldset>
                <fieldset>
                    <label htmlFor="transaction_reference">
                        Transaction reference
                    </label>
                    <span className="payment-reference">{order.charge}</span>
                </fieldset>
                <fieldset>
                    <label htmlFor="order_total">
                        Order Total
                    </label>
                    <span>{formatMoney(order.total)}</span>
                </fieldset>
                <fieldset>
                    <label htmlFor="order_summary">
                        Order Summary
                    </label>
                    <div className="items">
                        {order.items.map((item) => (
                            <div className="order-item" key={item.id}>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Total: {formatMoney(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </Form>
        </OrderStyles>
    )
}