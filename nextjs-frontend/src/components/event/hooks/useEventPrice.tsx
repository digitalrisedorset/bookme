import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useEventState} from "@/state/EventState";
import {useUser} from "@/components/user-authentication/hooks/useUser";

const EVENT_PRICE_QUERY = gql`
    query CalculatePrice($haircutId: ID!, $eventId: ID!, $shampoo: Int) {
      calculatePrice(haircutId: $haircutId, eventId: $eventId, shampoo: $shampoo)
    }
`;

export const useEventPrice = () => {
    const {eventState} = useEventState();
    const user = useUser()

    const { data } = useQuery(EVENT_PRICE_QUERY, {
        variables: { eventId: eventState.activeEventId, haircutId: user?.haircutType.id, shampoo: (eventState.shampoo === true)?1:0 }
    });

    return data?.calculatePrice
}