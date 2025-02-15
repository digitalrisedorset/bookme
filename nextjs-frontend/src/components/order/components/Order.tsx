import React from "react";
import {formatMoney} from "@/lib/price";
import Head from "next/head";
import {Form} from "@/components/global/styles/Form";
import OrderStyles from "@/components/order/styles/OrderStyles";
import {useOrder} from "@/components/order/graphql/useOrder";
import {Loading} from "@/components/global/components/Loading";
import {CartItems} from "@/components/order/components/Cart/CartItems";

interface OrderProps {
    orderId: string
}

export const Order: React.FC<OrderProps> = ({orderId}: OrderProps) => {
    const { data, loading } = useOrder(orderId);

    if (loading) return <Loading />

    const { order } = data;
    if (!order) return <>No Order was found</>

    return (
        <OrderStyles>
            <Head>
                <title>Your order - {order.orderReference}</title>
            </Head>
            <Form>
                <h2>Your order summary</h2>
                <fieldset>
                    <label htmlFor="order_reference">
                        Order reference
                    </label>
                    <span className="order-reference">{order.orderReference}</span>
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
                        <CartItems orderItems={order.items} />
                    </div>
                </fieldset>
            </Form>
        </OrderStyles>
    )
}