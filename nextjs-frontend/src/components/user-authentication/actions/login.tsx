"use server"

import {z} from "zod";
import {passwordSchema} from "@/components/user-authentication/validation/passwordSchema";
import {UserInformation} from "@/components/user-authentication/hooks/useUser";

export interface SignInResponse { data: { authenticateUserWithPassword: { __typename?: string, item: UserInformation} } }

export const loginUser = async ({email, password}: {
    email: string,
    password: string
}, signInCallback: () => SignInResponse) => {
    try {
        const loginUserSchema = z.object({
            email: z.string().email(),
            password: passwordSchema
        })

        const loginUserValidation = loginUserSchema.safeParse({
            email, password
        })

        if (loginUserValidation.error) {
            return {
                error: true,
                message: loginUserValidation.error.issues[0]?.message
            }
        }

        try {
            const res = await signInCallback()
            return (res?.data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure')
                ? res?.data?.authenticateUserWithPassword
                : res?.data?.authenticateUserWithPassword.item
        } catch (e) {
            console.log('There was an error', e)
        }

        // call keystone js
    } catch (e) {
        console.log('There was an error', e)
    }
}