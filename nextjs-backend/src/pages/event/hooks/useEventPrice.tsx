import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useEventState} from "@/state/EventState";

const EVENT_PRICE_QUERY = gql`
    query CalculatePrice($haircutId: ID!, $eventId: ID!, $shampoo: Int) {
      calculatePrice(haircutId: $haircutId, eventId: $eventId, shampoo: $shampoo)
    }
`;

export const useEventPrice = (eventId: string) => {
    const {haircut, shampoo} = useEventState();

    const { data } = useQuery(EVENT_PRICE_QUERY, {
        variables: { eventId, haircutId: haircut, shampoo: (shampoo === true)?1:0 }
    });

    return data?.calculatePrice
}