import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useEventState} from "@/state/EventState";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useUserPreferenceState} from "@/state/UserPreference";

const EVENT_PRICE_QUERY = gql`
    query CalculatePrice($eventTypeId: ID!, $eventId: ID!, $shampoo: Int) {
      calculatePrice(eventTypeId: $eventTypeId, eventId: $eventId, shampoo: $shampoo)
    }
`;

export const useEventPrice = () => {
    const {eventState} = useEventState();
    const {userPreference} = useUserPreferenceState()

    const { data } = useQuery(EVENT_PRICE_QUERY, {
        variables: { eventId: eventState.activeEventId, eventTypeId: userPreference?.eventTypeId, shampoo: (eventState.shampoo === true)?1:0 }
    });

    return data?.calculatePrice
}