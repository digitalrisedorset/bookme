import React from "react";
import Head from "next/head";
import {OrderDl, OrderItemStyles} from "@/components/order/styles/OrderItemStyles";
import {getOrderNumber} from "@/lib/order";
import {formatMoney} from "@/lib/price";
import {Section} from "@/components/order/styles/OrderStyles";
import {useOrders} from "@/components/order/graphql/useOrders";
import {useConfig} from "@/components/venue/hooks/useConfig";
import {Loading} from "@/components/global/components/Loading";
import {OrderItemsSummary} from "@/components/order/components/OrderList/OrderItemsSummary";
import {KeystoneOrder} from "@/components/order/types/order";
import {ImageResponsive} from "@/components/venue/components/Intro/ImageResponsive";

export const OrderList: React.FC = () => {
    const { data, loading } = useOrders();
    const config = useConfig()

    if (loading) return <Loading />
    const { orders } = data;

    return (
        <Section>
            <Head>
                <title>Your Orders ({orders.length})</title>
            </Head>
            <div className="side">
                <h2>You have {orders.length} orders!</h2>
                <ImageResponsive image={config.order} />
            </div>
            <OrderDl>
                {orders.map((order: KeystoneOrder, index: number) => (
                    <OrderItemStyles key={index}>
                        <h2>Order {getOrderNumber(order.orderNumber)}</h2>
                        <div className="order-meta">
                            <OrderItemsSummary orderItems={order.items} />
                            <h3>Total: {formatMoney(order.total)}</h3>
                        </div>
                    </OrderItemStyles>
                ))}
            </OrderDl>
        </Section>
    )
}