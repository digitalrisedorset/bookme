import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

const HAIRCUT_TYPE_GROUP_QUERY = gql`
    query HaircutTypeGroups($orderBy: [HaircutTypeGroupOrderByInput!]!) {
      haircutTypeGroups(orderBy: $orderBy) {
        id
        name
      }
    }
`;

export const useHaircutTypeGroups = () => {
    const haircutTypeGroupsData = useQuery(HAIRCUT_TYPE_GROUP_QUERY, {
        variables: {
            "orderBy": [
                {
                    "name": "asc"
                }
            ]
        },
        fetchPolicy: 'no-cache'
    });

    return haircutTypeGroupsData
}