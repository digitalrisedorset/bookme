import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useEventState} from "@/state/EventState";
import {useUser} from "@/components/user-authentication/hooks/useUser";

const EVENT_DURATION_QUERY = gql`
    query CalculateEventDuration($eventTypeId: ID!, $eventId: ID!, $shampoo: Int) {
      calculateEventDuration(eventTypeId: $eventTypeId, eventId: $eventId, shampoo: $shampoo)
    }
`;

export const useEventDuration = () => {
    const {eventState} = useEventState();
    const user = useUser()

    const { data } = useQuery(EVENT_DURATION_QUERY, {
        variables: { eventId: eventState.activeEventId, eventTypeId: user?.eventType?.id, shampoo: (eventState.shampoo === true)?1:0 }
    });

    return data?.calculateEventDuration
}