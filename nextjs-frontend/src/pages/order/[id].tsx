import {useRouter} from "next/router";
import React from "react";
import {sanitiseString} from "@/lib/string";
import {Order} from "@/components/order/components/Order";

export default function OrderPage() {
    const router = useRouter();

    const orderId = sanitiseString(router.query.id);

    if (!orderId) return

    return (
        <Order orderId={orderId} />
    )
}