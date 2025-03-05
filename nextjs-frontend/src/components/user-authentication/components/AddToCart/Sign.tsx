import {useRouter} from "next/router";
import {useForm} from "@/components/global/hooks/useForm";
import {useLoginUser} from "@/components/user-authentication/graphql/useLoginUser";
import {useFlashMessage} from "@/state/FlassMessageState";
import {Form} from "@/components/global/styles/Form";
import {Feedback} from "@/components/global/components/Feedback";
import {useAddToCart} from "@/components/event/graphql/useAddToCart";
import React from "react";

export const Sign: React.FC = () => {
    const [addToCart, { loading }] = useAddToCart();
    const router = useRouter()
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    });
    const setUserLogged = useLoginUser(inputs)
    const {addSuccessMessage, addErrorMessage} = useFlashMessage()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        const res = await setUserLogged()

        resetForm();
        if (!res.name) {
            addErrorMessage('Something went wrong!')
            console.log('error when logging')
        } else {
            addSuccessMessage(`Welcome ${res.name}!`)
            await addToCart().catch(console.error);
            router.push({pathname: '/events'});
        }
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Into Your Account</h2>
            <Feedback />
            <fieldset>
                <label htmlFor="email">
                    Email
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        required
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign In!</button>
            </fieldset>
        </Form>
    );
}
