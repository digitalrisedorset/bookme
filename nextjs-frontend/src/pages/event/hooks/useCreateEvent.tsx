import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($data: EventCreateInput!) {
  createEvent(data: $data) {
    eventType {
      name
    }
    venue {
      name
    }
    status
    day
  }
}
`;

export const useCreateEvent = (inputs: string[]) => {
    inputs["venue"] = {
        "connect": {
            "id": "480735f3-00a2-4da6-b051-5be509bbbefe"
        }
    }
    inputs["status"] = "open";
    inputs["day"] = "tuesday";

    const response = useMutation(CREATE_EVENT_MUTATION, {
        variables: inputs,
    });

    return response;
}