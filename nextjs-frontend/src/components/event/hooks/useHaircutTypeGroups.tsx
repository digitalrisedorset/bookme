import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useVenueConfigState} from "@/state/VenueConfigState";

const HAIRCUT_TYPE_GROUP_QUERY = gql`
    query HaircutTypeGroups($where: HaircutTypeGroupWhereInput!, $orderBy: [HaircutTypeGroupOrderByInput!]!) {
      haircutTypeGroups(where: $where, orderBy: $orderBy) {
        id
        name
      }
    }
`;

export const useHaircutTypeGroups = () => {
    const {config} = useVenueConfigState()

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
                        "equals": config.id
                    }
                }
            }
        },
        fetchPolicy: 'no-cache'
    });

    return haircutTypeGroupsData
}