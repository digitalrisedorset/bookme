import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../hooks/useUser";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export const useSignUpUser = (inputs: any) => {
    const response = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
        // refectch the currently logged in user
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return response;
}