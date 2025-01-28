import React from "react";
import {formatMoney} from "@/lib/price";
import {OrderItem} from "@/components/order/types/order";

interface OrderItemsProps {
    orderItems: OrderItem[]
}

export const CartItems: React.FC<OrderItemsProps> = ({orderItems}: OrderItemsProps) => {
    if (!orderItems?.length) return <>This order is not valid</>

    return (
        <>
            {orderItems.map((item: OrderItem) => (
                <div className="order-item" key={item.id}>
                    <div className="item-details">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Total: {formatMoney(item.price * item.quantity)}</p>
                    </div>
                </div>
            ))}
        </>
    )
}