import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY, useUser} from "../hooks/useUser";

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUsers($data: [UserUpdateArgs!]!) {
      updateUsers(data: $data) {
        id
      }
    }
`;

export const useWeekPreference = () => {
    const response = useMutation(
        UPDATE_USER_MUTATION,{
            // refectch the currently logged in user
            refetchQueries: [{query: CURRENT_USER_QUERY}],
        }
    );

    return response
}