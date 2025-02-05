"use server"

import {z} from "zod";

export const register = async ({
               email,
               name,
               password
}: {
    email: string,
    name: string,
    password: string,
}, signupCallback: () => void) => {
    try {
        const newUserSchema = z.object({
            email: z.string().email(),
            name: z.string(),
            password: z.string().min(5, "Password must contain at least 5 characters")
        })

        const newUserValidation = newUserSchema.safeParse({
            email, name, password
        })

        if (newUserValidation.error) {
            return {
                error: true,
                message: newUserValidation.error.issues[0]?.message
            }
        }

        await signupCallback();

        return true
    } catch (e) {
        console.log('There was an error', e)
    }
}