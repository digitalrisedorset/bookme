import {useOrders} from "@/components/order/graphql/useOrders";
import {ErrorMessage} from "@/components/global/components/ErrorMessage";
import {formatMoney} from "@/lib/price";
import {OrderItemStyles, OrderDl} from "@/components/order/styles/OrderItemStyles";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import {Section} from "@/components/order/styles/OrderStyles";

function countItemsInAnOrder(order) {
    return order.items.map((orderItem) => (
        <div key={orderItem.id}>
            <h3>Appointment {orderItem.name} at {formatMoney(orderItem.price)}</h3>
            <p >{orderItem.description}</p>
        </div>
        ));
}

export default function OrderListPage() {
    const { data, error, loading } = useOrders();

    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage error={error} />;
    const { orders } = data;

    return (
        <Section>
            <Head>
                <title>Your Orders ({orders.length})</title>
            </Head>
            <div>
                <h2>You have {orders.length} orders!</h2>
                <Image className="logo" src="/images/orderplaceholder1.jpg" width="378" height="378" alt=""/>
            </div>
            <OrderDl>
                {orders.map((order, index) => (
                    <OrderItemStyles key={index}>
                        <h2>Order {index + 1}</h2>
                        <div className="order-meta">
                            {countItemsInAnOrder(order)}
                            <h3>Total: {formatMoney(order.total)}</h3>
                        </div>
                    </OrderItemStyles>
                ))}
            </OrderDl>
        </Section>
    )
}