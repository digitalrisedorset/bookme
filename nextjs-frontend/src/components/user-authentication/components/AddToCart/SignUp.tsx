import {useRouter} from "next/router";
import {useLoginUser} from "@/components/user-authentication/graphql/useLoginUser";
import {useFlashMessage} from "@/state/FlassMessageState";
import {Feedback} from "@/components/global/components/Feedback";
import {tr} from "@/lib/translate";
import {useVenueConfigState} from "@/state/VenueConfigState";
import React, {ChangeEvent, useState} from "react";
import {useAddToCart} from "@/components/event/graphql/useAddToCart";
import {useForm} from "@/components/global/hooks/useForm";
import {useSignUpUser} from "@/components/user-authentication/graphql/useSignUp";
import {Form} from "@/components/global/styles/Form";
import {Loading} from "@/components/global/components/Loading";

export const SignUp: React.FC = () => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signup, { data }] = useSignUpUser(inputs)
  const setUserLogged = useLoginUser(inputs)
  const {addSuccessMessage, addErrorMessage} = useFlashMessage()
  const {activeVenue} = useVenueConfigState()
  const [addToCart, { loading }] = useAddToCart();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the form from submitting

    if (inputs.password !== confirmPassword) {
      addErrorMessage('Password and Confirm Password do not match')
      return
    }

    await signup().catch(console.error);
    resetForm();
    const res = await setUserLogged();
    // Send the email and password to the graphqlAPI
    if (res?.message) {
      addErrorMessage('Something went wrong!')
      console.log('error when logging', res?.message)
    } else {
      addSuccessMessage(`Ready to book your first ${tr('appointment', activeVenue)}!`)
      await addToCart().catch(console.error);
      router.push({pathname: '/events'});
    }
  }

  if (loading) return <Loading />

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <Feedback />
      <fieldset>
        {data?.createUser && (
            <p>
              Signed up with {data.createUser.email} - Please Go Head and Sign in!
            </p>
        )}
        <label htmlFor="name">
          Your Name
          <input
              required
              type="text"
              name="name"
              placeholder="Your Name"
              autoComplete="name"
              value={inputs.name}
              onChange={handleChange}
          />
        </label>
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
              minLength={6}
              placeholder="Password"
              autoComplete="password"
              value={inputs.password}
              onChange={handleChange}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
              required
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}
