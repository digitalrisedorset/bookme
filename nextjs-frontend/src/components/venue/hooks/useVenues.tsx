import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const VENUES_QUERY = gql`
    query Venues {
      venues {
        id
        name
      }
    }
`;

export const useVenues = () => {
    const venueData = useQuery(VENUES_QUERY, {
        variables: {},
        fetchPolicy: "cache-and-network"
    });

    return venueData
}