import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const VENUES_QUERY = gql`
    query Venues {
  venues {
    name
  }
}
`;

export const useEvents = () => {
    const venueData = useQuery(VENUES_QUERY, {
        variables: {},
        fetchPolicy: 'no-cache'
    });

    return venueData
}