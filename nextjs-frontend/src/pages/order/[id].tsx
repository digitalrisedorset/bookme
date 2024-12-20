import {useOrder} from "@/pages/order/graphql/useOrder";
import {ErrorMessage} from "@/pages/global/components/ErrorMessage";
import {formatMoney} from "@/lib/price";
import OrderStyles from "@/pages/order/styles/OrderStyles";
import Head from 'next/head';
import {useRouter} from "next/router";

export default function OrderPage() {
    const router = useRouter();
    const orderId = router.query.id ?? '';

    const { data, error, loading } = useOrder(orderId);

    if (loading) return <p>Loading...</p>;
    if (error) return <ErrorMessage error={error} />;
    const { order } = data;

    return (
        <OrderStyles>
            <Head>
                <title>Sick Fits - {order.id}</title>
            </Head>
            <p>
                <span>Order Id: </span>
                <span>{order.id}</span>
            </p>
            <p>
                <span>Charge:</span>
                <span>{order.charge}</span>
            </p>
            <p>
                <span>Order Total:</span>
                <span>{formatMoney(order.total)}</span>
            </p>
            <p>
                <span>ItemCount:</span>
                <span>{order.items.length}</span>
            </p>
            <div className="items">
                {order.items.map((item) => (
                    <div className="order-item" key={item.id}>
                        <div className="item-details">
                            <h2>{item.name}</h2>
                            <p>Qty: {item.quantity}</p>
                            <p>Each: {formatMoney(item.price)}</p>
                            <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </OrderStyles>
    )
}