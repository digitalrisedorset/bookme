import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUserPreferenceState} from "@/state/UserPreference";

const HAIRCUT_TYPE_QUERY = gql`
    query EventTypes($where: EventTypeWhereInput!, $orderBy: [EventTypeOrderByInput!]!) {
      eventTypes(where: $where, orderBy: $orderBy) {
        id
        name
      }
    }
`;

export const useEventTypes = () => {
    const {userPreference} = useUserPreferenceState()

    const eventTypesData = useQuery(HAIRCUT_TYPE_QUERY, {
        variables: {
            "where": {
                "group": {
                    "id": {
                        "equals": userPreference?.eventTypeGroupId
                    }
                }
            },
            "orderBy": [
                {
                    "name": "asc"
                }
            ]
        },
        fetchPolicy: 'no-cache'
    });

    return eventTypesData
}