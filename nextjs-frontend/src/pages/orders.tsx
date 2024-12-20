import {useOrders} from "@/pages/order/graphql/useOrders";
import {ErrorMessage} from "@/pages/global/components/ErrorMessage";
import {formatMoney} from "@/lib/price";
import {OrderItemStyles, OrderDl} from "@/pages/order/styles/OrderItemStyles";
import Link from "next/link";
import Head from "next/head";

function countItemsInAnOrder(order) {
    return order.items.map((orderItem) => (
            <p key={orderItem.id}>{orderItem.quantity} booking to attend the event {orderItem.name} at {formatMoney(orderItem.price)} each</p>
        ));
}

export default function OrderListPage() {
    const { data, error, loading } = useOrders();

    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage error={error} />;
    const { orders } = data;

    return (
        <>
            <Head>
                <title>Your Orders ({orders.length})</title>
            </Head>
            <h2>You have {orders.length} orders!</h2>
            <OrderDl>
                {orders.map((order, index) => (
                    <OrderItemStyles key={index}>
                        <h2><Link href={`/order/${order.id}`}>Order {index + 1}</Link></h2>
                        <div className="order-meta">
                            {countItemsInAnOrder(order)}
                            <h3>Total: {formatMoney(order.total)}</h3>
                        </div>
                    </OrderItemStyles>
                ))}
            </OrderDl>
        </>
    )
}