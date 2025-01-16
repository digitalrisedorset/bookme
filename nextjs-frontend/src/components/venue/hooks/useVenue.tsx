import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useVenueConfigState} from "@/state/VenueConfigState";

const VENUES_QUERY = gql`
   query Venues($where: VenueWhereInput!) {
      venues(where: $where) {
        name
        id
      }
   }
`;

export const useVenue = () => {
    const {activeVenue} = useVenueConfigState()

    const venueData = useQuery(VENUES_QUERY, {
        variables: {
            "where": {
                "code": {
                    "equals": activeVenue
                }
            }
        }
    });

    return venueData?.data?.venues[0]
}