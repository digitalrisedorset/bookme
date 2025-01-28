import React from "react";
import {OrderItem} from "@/components/order/types/order";
import {formatMoney} from "@/lib/price";

interface OrderItemsProps {
    orderItems: OrderItem[]
}

export const OrderItemsSummary: React.FC<OrderItemsProps> = ({orderItems}: OrderItemsProps) => {
    if (!orderItems || orderItems.length===0) return

    return (
        orderItems.map((orderItem: OrderItem) => (
            <div key={orderItem.id}>
                <h3>Appointment {orderItem.name} at {formatMoney(orderItem.price)}</h3>
                <p >{orderItem.description}</p>
            </div>
        ))
    )
}