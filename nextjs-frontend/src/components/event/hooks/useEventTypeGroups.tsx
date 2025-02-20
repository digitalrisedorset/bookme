import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useVenue} from "@/components/venue/hooks/useVenue";

const HAIRCUT_TYPE_GROUP_QUERY = gql`
    query Query($venueId: ID!) {
      venueEventTypeGroups(venueId: $venueId) {
        id
        name
      }
    }
`;

export const useEventTypeGroups = () => {
    const venue = useVenue()

    const eventTypeGroupsData = useQuery(HAIRCUT_TYPE_GROUP_QUERY, {
        variables: {
            "venueId": venue?.id
        },
        fetchPolicy: 'no-cache'
    });

    return eventTypeGroupsData
}