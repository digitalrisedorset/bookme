import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useVenue} from "@/components/venue/hooks/useVenue";

const HAIRCUT_TYPE_GROUP_QUERY = gql`
    query Query($venueId: ID!) {
      venueHaircutTypeGroups(venueId: $venueId) {
        id
        name
      }
    }
`;

export const useHaircutTypeGroups = () => {
    const venue = useVenue()

    const haircutTypeGroupsData = useQuery(HAIRCUT_TYPE_GROUP_QUERY, {
        variables: {
            "venueId": venue?.id
        },
        fetchPolicy: 'no-cache'
    });

    return haircutTypeGroupsData
}