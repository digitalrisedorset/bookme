import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useVenue} from "@/components/venue/hooks/useVenue";

const HAIRCUT_TYPE_GROUP_QUERY = gql`
    query EventTypeGroups($where: EventTypeGroupWhereInput!, $orderBy: [EventTypeGroupOrderByInput!]!) {
      eventTypeGroups(where: $where, orderBy: $orderBy) {
        id
        name
      }
    }
`;

export const useEventTypeGroups = () => {
    const venue = useVenue()

    const eventTypeGroupsData = useQuery(HAIRCUT_TYPE_GROUP_QUERY, {
        variables: {
            "orderBy": [
                {
                    "name": "asc"
                }
            ],
            "where": {
                "venue": {
                    "id": {
                        "equals": venue?.id
                    }
                }
            }
        },
        fetchPolicy: 'no-cache'
    });

    return eventTypeGroupsData
}