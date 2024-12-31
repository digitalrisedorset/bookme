import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const HAIRCUT_TYPE_QUERY = gql`
    query HaircutTypes {
      haircutTypes {
        name
      }
    }
`;

export const useHaircutTypes = () => {
    const haircutTypesData = useQuery(HAIRCUT_TYPE_QUERY, {
        variables: {},
        fetchPolicy: 'no-cache'
    });

    return haircutTypesData
}