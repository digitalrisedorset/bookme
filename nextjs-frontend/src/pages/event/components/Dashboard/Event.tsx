import React from "react";
import {EventStyles} from "@/pages/global/styles/ItemStyles";
import {KeystoneEvent} from "@/pages/event/types/event";
import {AddToCart} from "@/pages/event/components/Dashboard/Event/AddToCart";
import {useUser} from "@/pages/user-authentication/hooks/useUser";
import {EventCount} from "@/pages/event/components/Dashboard/Event/EventCount";
import {Attendees} from "@/pages/event/components/Dashboard/Event/Attendees";
import {getDate, getTime} from "@/lib/date";
import {getEventCartQty} from "@/lib/cart";
import {capitalise} from "@/lib/string";

interface EventProps {
    event: KeystoneEvent
}

export const Event: React.FC<EventProps> = ({event}: EventProps) => {
    const user = useUser()

    const getEventTitle = (event: KeystoneEvent) => {
        return `${capitalise(event.day)}`
    }

    const isEventInCart = () => {
        if (getEventCartQty(user?.cartItems, event.id)>0) {
            return "true"
        }

        return "false"
    }

    return (
        <EventStyles incart={isEventInCart()}>
            <span className="title">{getEventTitle(event)}</span>
            <span className="date">{getDate(event.startTime)}<br/>from {getTime(event.startTime)} to {getTime(event.endTime)}</span>
            <EventCount count={getEventCartQty(user?.cartItems, event.id)}/>
            <div className="in-cart">
                <p>You&apos;re in!</p>
            </div>
            <AddToCart id={event.id}>Book Now</AddToCart>
        </EventStyles>
    )
}