import React from "react";
import {useRouter} from "next/router";
import {ViewButton} from "@/pages/global/styles/ItemStyles";

interface ViewOrderDetailProps {
    orderItemId: string
}

export const ViewOrderDetail: React.FC<ViewOrderDetailProps> = ({orderItemId}: ViewOrderDetailProps) => {
    const router = useRouter()

    if (orderItemId === null) return null

    const viewDetail = (e: React.FormEvent) => {
        e.preventDefault();
        router.push({pathname: `/order/${orderItemId}`});
    }

    return (
        <ViewButton>
            <button className="view-detail" type="button" onClick={viewDetail}>
                View Order
            </button>
        </ViewButton>
    )
}