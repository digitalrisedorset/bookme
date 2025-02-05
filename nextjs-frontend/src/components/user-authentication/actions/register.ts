"use server"

import {z} from "zod";
import {hash} from 'bcryptjs'
import {SIGNUP_MUTATION} from "@/components/user-authentication/graphql/useSignUp";
import {formProps} from "@/components/global/types/form";
import {graphQLVariables} from "@/components/user-authentication/types/user";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "@/components/user-authentication/hooks/useUser";

export const register = async ({
               email,
               name,
               password
}: {
    email: string,
    name: string,
    password: string,
}, signupCallback: () => any) => {
    try {
        const newUserSchema = z.object({
            email: z.string().email(),
            name: z.string(),
            password: z.string().min(5, "Password must contain at least 5 characters")
        })

        const newUserValidation = newUserSchema.safeParse({
            email, name, password
        })

        if (!newUserValidation) {
            return {
                error: true,
                message: newUserValidation.error.issues[0]?.message
            }
        }

        await signupCallback().catch(console.error);

        return true
    } catch (e) {

    }
}

export const keystoneSignUpUser = (inputs: formProps, venueId: string) => {
    const variables: graphQLVariables = inputs

    variables["venue"] = {
        "connect": {
            "id": venueId
        }
    }

    const response = useMutation(SIGNUP_MUTATION, {
        variables: {
            data: variables
        },
        // refectch the currently logged in user
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return response;
}