import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {Hairdresser} from "@/components/event/types/event";

const HAIRDRESSER_QUERY = gql`
    query Hairdressers {
      hairdressers {
        id
        name
        haircutTypes {
            id
        }
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

export const getHairdresserDetail = (hairdressers: Hairdresser[], hairdresserId: string) => {
    const result = hairdressers.filter((hairdresser: Hairdresser) => hairdresser.id === hairdresserId)
    return result[0]
}