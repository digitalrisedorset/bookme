import {useOrder} from "@/pages/order/graphql/useOrder";
import {ErrorMessage} from "@/pages/global/components/ErrorMessage";
import {formatMoney} from "@/lib/price";
import OrderStyles from "@/pages/order/styles/OrderStyles";
import Head from 'next/head';
import {useRouter} from "next/router";
import {Form} from "@/pages/global/styles/Form";

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
                <title>Your order - {order.id}</title>
            </Head>
            <Form>
                <h2>Your order summary</h2>
                <ErrorMessage/>
                <fieldset>
                    <label htmlFor="order_reference">
                        Order reference
                    </label>
                    <span>{order.id}</span>
                </fieldset>
                <fieldset>
                    <label htmlFor="transaction_reference">
                        Transaction reference
                    </label>
                    <span>{order.charge}</span>
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