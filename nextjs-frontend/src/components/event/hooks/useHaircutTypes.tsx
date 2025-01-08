import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUser} from "@/components/user-authentication/hooks/useUser";

const HAIRCUT_TYPE_QUERY = gql`
    query HaircutTypes($where: HaircutTypeWhereInput!, $orderBy: [HaircutTypeOrderByInput!]!) {
      haircutTypes(where: $where, orderBy: $orderBy) {
        id
        name
      }
    }
`;

export const useHaircutTypes = () => {
    const user = useUser()

    const haircutTypesData = useQuery(HAIRCUT_TYPE_QUERY, {
        variables: {
            "where": {
                "group": {
                    "id": {
                        "equals": user?.haircutTypeGroup.id
                    }
                }
            },
            "orderBy": [
                {
                    "name": "asc"
                }
            ]
        },
        fetchPolicy: 'no-cache'
    });

    return haircutTypesData
}