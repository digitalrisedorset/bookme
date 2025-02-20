import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUser} from "@/components/user-authentication/hooks/useUser";

const HAIRCUT_TYPE_QUERY = gql`
    query EventTypes($where: EventTypeWhereInput!, $orderBy: [EventTypeOrderByInput!]!) {
      eventTypes(where: $where, orderBy: $orderBy) {
        id
        name
      }
    }
`;

export const useEventTypes = () => {
    const user = useUser()

    const eventTypesData = useQuery(HAIRCUT_TYPE_QUERY, {
        variables: {
            "where": {
                "group": {
                    "id": {
                        "equals": user?.eventTypeGroup?.id
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