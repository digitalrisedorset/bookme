import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../hooks/useUser";
import {useVenue} from "@/components/venue/hooks/useVenue";

const SIGNUP_MUTATION = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      email
      name
    }
  }
`;

export const useSignUpUser = (inputs: string[]) => {
    const venue = useVenue()

    inputs["venue"] = {
        "connect": {
            "id": venue?.id
        }
    }

    const response = useMutation(SIGNUP_MUTATION, {
        variables: {
            data: inputs
        },
        // refectch the currently logged in user
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return response;
}