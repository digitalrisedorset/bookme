import styled from 'styled-components';
import {BOOKED_EVENT, EventStatus, PAST_EVENT, PURCHASED_EVENT, WALKIN_EVENT} from "@/components/event/types/event";

interface StyleProps {
    required?: boolean;
}

export const EventList = styled.section`
    display: grid;
    grid-row: 3;
    grid-column: 2 / -1;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    padding: 40px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const WeekEventList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    border: 1px solid var(--red);
    margin-top: 1rem;
    min-height: 300px;
    h4 {
        padding: 10px;
        font-weight: bold;
        background: var(--red);
        color: white;
    }

    .accordion-title {
        position: relative;
        .set-active {
            position: absolute;
            right: 10px;
            top:10px;
            color:white;
        }
        
    }
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const EventDetail = styled.div`
    width: 100%;
    display: block;
    position: relative;  
    padding: 5px;

    @media (max-width: 600px) {
        width:100%;
    }
`

export const EventSummary = styled.div`
    width: 100%;
    display: block;
    position: relative;  
    padding: 5px;

    @media (max-width: 600px) {
        width:100%;
    }
`

interface EventProps {
    status?: EventStatus
}

export const SingleEvent = styled.div<EventProps>`
    position: relative;
    width: 100%;
    display: block;
    border: 1px solid #ededed;
    margin: 3px 0;
    padding: 10px;
    p {
        text-align: left;
        line-height: 1.3rem;
    }
    .eventHost-selection {
        position: relative;
        display: block;
        text-align: left;
        line-height: 1.4rem;
        label {
            /*padding: 5px;*/
        }
    }
    .view-detail {
        position: absolute;
        right: 5px;
        bottom: 10px;
        padding: 5px;
    }
    .add-to-cart {
        position: absolute;
        font-size: 12px;
        background-color: var(--red);
        border: none;
        cursor: pointer;
        color: white;
        padding: 5px;
        right: 10px;
        visibility: ${(props) => props.status === BOOKED_EVENT && `hidden;`};
        border-radius: 3px;
    }
    .add-to-cart:hover {
        background-color: var(--darkgrey);
    }
    .timestamp {
        position: absolute;
        width: 100%;
        left: 0;
        font-size: xx-small;
    }
`

export const SingleScheduleEvent = styled.div<EventProps>`
    position: relative;
    width: 100%;
    display: block;
    border: 1px solid #ededed;
    background: ${(props) => props.status === PAST_EVENT && `var(--lightgrey);`};
    margin: 3px 0;
    padding: 10px;
    p {
        text-align: left;
        line-height: 1.3rem;
        color: ${(props) => props.status === PURCHASED_EVENT && `var(--red);`};
    }
    .view-detail {
        position: absolute;
        right: 5px;
        bottom: 10px;
        padding: 5px;
    }
    .walk-in {
        visibility: ${(props) => (props.status !== WALKIN_EVENT) && `hidden`};
        margin: 0 1rem;
        text-align: center;

        p {
            position: absolute;
            transform: skew(-20deg) rotate(-10deg);
            top: 10px;
            left: 60px;
            text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
            background: var(--red);
            font-size:1rem;
            color: white;
            padding: 0 5px;
            z-index: 3;
        }
    },
    .past-event {
        visibility: ${(props) => props.status !== PAST_EVENT && `hidden;`};
        p {
            top: 7px;
            position: absolute;
            transform: skew(-20deg) rotate(-10deg);
            background: var(--darkgrey);
            line-height: 1.3;
            font-size: 1rem;
            color: white;
            padding: 0 5px;
            margin: 0 0px 0 45px;
            z-index: 3;
        }
    }
`


interface EventStatusProps {
    active?: string
}

export const ViewEventStyle = styled.div<EventStatusProps>`
    h5 {
        font-size: 1.5rem;
        padding: 10px;
        background: var(--red);
        color: white;
    }
    .title {
        margin: 1rem;
    }
    .date {
        margin: 1rem;
    }
    .price {
        text-align: left;
        color: var(--black);
        font-weight: bold;
        font-size: 1.5rem;
    }
    .add-to-cart {
        background-color: var(--red);
    }
`

export const EventRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    width: 80%;
    margin: 10px auto;
    font-size: 1.2rem;
    .label {
        text-align: left;
        font-weight: bold;
    }
    .title {
        text-align: left;
    }
    @media (max-width: 600px) {
        width: 95%;
        font-size: 1rem;
        grid-template-columns: 1fr;
    }
`

export const SelectStyle = styled.div`
    position: relative;
    display: block;
    text-align: left;
    line-height: 1.4rem;
    label {
        padding: 5px;
    }
`

export const EventStyles = styled.div<EventProps>`
    position: relative;
    background-color: var(--red);
    padding: 30px;
    border-radius: 5px;
    background-image: url('../images/card-booking-2.png') ;
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: top left;
    .title {
        display: block;
        color: white;
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
        font-weight: normal;
        font-size: 1.5rem;
        margin-bottom: 2rem;
        height:50px;
        width: 95%;
        text-align: center;
    }
    .date {
        position: relative;
        z-index: 1;
        color: white;
        font-size: 1.1rem;
        line-height: 2;
        display: block;
        padding-top: 1rem;
        height: 100px;
    }
    .date:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;
        opacity: .3;
        z-index: -1;
        background-color: var(--red);
        border-radius: 10px;
    }
    .capacity {
        color: white;
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 0.9rem;
        background: var(--darkgrey);
        padding: 6px 10px;
        border-radius: 5px;
    }
    .cart-qty {
        position: absolute;
        top: -10px;
        right: -10px;
        background: #ffffff;
        border-radius: 50%;
        display: block;
        padding: 10px 15px;
        border: 1px solid var(--lightgrey);
        background: ${(props) => props.status === BOOKED_EVENT && `var(--red);`};
    }
    .add-to-cart {
        display: inline-block;
        font-size: 16px;
        background-color: var(--black);
        border: none;
        cursor: pointer;
        color: white;
        padding: 8px 12px;
        margin: 20px 0;
        width: 60%;
        visibility: ${(props) => props.status === BOOKED_EVENT && `hidden;`};
        border-radius: 3px;
    }
    .add-to-cart:hover {
        background-color: var(--darkgrey);
    }
    .in-cart {
        visibility: ${(props) => props.status !== BOOKED_EVENT && `hidden;`};
        margin: 0 1rem;
        text-align: center;
        p {
            position: absolute;
            transform: skew(-20deg) rotate(-10deg);
            top: 230px;
            left: -5px;
            margin-top: -3rem;
            text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
            background: var(--red);
            line-height: 1.3;
            font-size: 4rem;
            width: 102%;
            color: white;
            padding: 0 1rem;
            z-index: 3;
        }
        .ordered {
            visibility: ${(props) => props.status !== BOOKED_EVENT && `hidden;`};
            margin: 0 1rem;
            text-align: center;
            p {
                position: absolute;
                transform: skew(-20deg) rotate(-10deg);
                top: 230px;
                left: -5px;
                margin-top: -3rem;
                text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
                background: var(--red);
                line-height: 1.3;
                font-size: 4rem;
                width: 102%;
                color: white;
                padding: 0 1rem;
                z-index: 3;
            }
    }

    @media (max-width: 600px) {
        .in-cart {
            p {
                width: 80%;
                left: 10%;
                top: 65%;
            }            
        }
        .add-to-cart {
            font-size: 2rem;
        }
        .cart-qty {
            font-size: 2rem;
        }
        .capacity {
            font-size: 1.5rem;
        }
        .date {
            font-size: 1.4rem;
        }
        .title {
            font-size: 2rem;
        }
    }
`

export const ItemStyles = styled.div<StyleProps>`
  background: #FEEBEB;
    border-radius: 20px;
    padding: 1rem;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;
    float: left;
    margin: 5px;
    width: 23%;
    height: 170px;
    .date {
        margin: 10px 0;
    }
    .qty {
        position: absolute;
        top:5px;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        right: 5px;
        padding: 5px 10px;
        overflow: hidden;
        font-size: medium;
        text-transform: lowercase;
        border: 1px solid var(--offWhite);
        box-shadow: var(--bs);
        background: white;
    }
    .capacity {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #383838;
        font-size: 0.8rem;
    }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
    .add-to-cart {
        border-radius: 5px;
        padding: 10px;
        position: absolute;
        bottom: 1rem;
        width: 50%;
    }
`;

export const ViewButton = styled.div<EventProps>`
     .in-cart {
         visibility: ${(props) => props.status !== BOOKED_EVENT && `hidden;`};
         p {
             top: 7px;
             position: absolute;
             transform: skew(-20deg) rotate(-10deg);
             background: var(--red);
             line-height: 1.3;
             font-size: 1rem;
             color: white;
             padding: 0 5px;
             margin: 0 0px 0 45px;
             z-index: 3;
         }
    },
    .past-event {
        visibility: ${(props) => props.status !== PAST_EVENT && `hidden;`};
        p {
            top: 7px;
            position: absolute;
            transform: skew(-20deg) rotate(-10deg);
            background: var(--darkgrey);
            line-height: 1.3;
            font-size: 1rem;
            color: white;
            padding: 0 5px;
            margin: 0 0px 0 45px;
            z-index: 3;
        }
    },
    .ordered {
        visibility: ${(props) => props.status !== PURCHASED_EVENT && `hidden;`};
        p {
            top: 7px;
            position: absolute;
            transform: skew(-20deg) rotate(-10deg);
            background: var(--red);
            line-height: 1.3;
            font-size: 1rem;
            color: white;
            padding: 0 5px;
            margin: 0 0px 0 45px;
            z-index: 3;
        }
    }
`

export const BookButton = styled.div<EventProps>`
    position: relative;
    width: 300px;
    margin-left: 30%;
     .in-cart {
         visibility: ${(props) => props.status !== BOOKED_EVENT && `hidden;`};
         p {
             top: 7px;
             left: 0;
             position: absolute;
             transform: skew(-20deg) rotate(-10deg);
             background: var(--red);
             line-height: 1.3;
             font-size: 2rem;
             color: white;
             padding: 0 5px;
             margin: 0 0px 0 45px;
             z-index: 3;
         }
    }

    @media (max-width: 600px) {
        width: 200px;
    }
`

export const ViewGroupEventStyle= styled.div<EventStatusProps>`
    h5 {
        font-size: 1.7rem;
        padding: 10px;
        background: var(--red);
        color: white;
    }
    .title, .eventHost-selection, .price {
        margin: 1rem;
    }
    .date {
        margin: 1rem;
    }
    .price {
        text-align: left;
        color: var(--black);
        font-weight: bold;
        font-size: 1.5rem;
    }
    .add-to-cart {
        background-color: var(--red);
        color: white;
        &[disabled] {
            opacity: 0.5;
        }
    }
    .eventHost-selection {
        position: relative;
        display: block;
        text-align: left;
        line-height: 1.4rem;
        label {
            padding: 5px;
        }
    }
`