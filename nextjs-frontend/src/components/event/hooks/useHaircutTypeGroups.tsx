import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useVenue} from "@/components/venue/hooks/useVenue";

const HAIRCUT_TYPE_GROUP_QUERY = gql`
    query HaircutTypeGroups($where: HaircutTypeGroupWhereInput!, $orderBy: [HaircutTypeGroupOrderByInput!]!) {
      haircutTypeGroups(where: $where, orderBy: $orderBy) {
        id
        name
      }
    }
`;

export const useHaircutTypeGroups = () => {
    const venue = useVenue()

    const haircutTypeGroupsData = useQuery(HAIRCUT_TYPE_GROUP_QUERY, {
        variables: {
            "orderBy": [
                {
                    "name": "asc"
                }
            ],
            "where": {
                "venue": {
                    "id": {
                        "equals": venue?.id
                    }
                }
            }
        },
        fetchPolicy: 'no-cache'
    });

    return haircutTypeGroupsData
}