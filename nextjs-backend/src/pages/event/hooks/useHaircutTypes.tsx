import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const HAIRCUT_TYPE_QUERY = gql`
    query HaircutTypes {
      haircutTypes {
        id
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