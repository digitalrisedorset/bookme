import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const HAIRDRESSER_QUERY = gql`
    query Hairdressers {
      hairdressers {
        name
      }
    }
`;

export const useHairdressers = () => {
    const hairdresserData = useQuery(HAIRDRESSER_QUERY, {
        variables: {},
        fetchPolicy: "cache-and-network"
    });

    return hairdresserData
}