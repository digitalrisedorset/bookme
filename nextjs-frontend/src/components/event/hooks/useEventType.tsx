import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUserPreferenceState} from "@/state/UserPreference";

const EVENT_TYPE_QUERY = gql`
    query EventType($where: EventTypeWhereUniqueInput!) {
      eventType(where: $where) {
        id
        name
      }
    }
`;

export const useEventType = () => {
    const {userPreference} = useUserPreferenceState()

    const eventTypesData = useQuery(EVENT_TYPE_QUERY, {
        variables: {
            "where": {
                "id": userPreference?.eventTypeId
            }
        }
    });

    return {
        eventType: eventTypesData.data?.eventType,
        loadingEventType: eventTypesData.loading
    }
}