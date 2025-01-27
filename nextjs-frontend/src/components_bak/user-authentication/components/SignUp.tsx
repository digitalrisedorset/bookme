import {Form} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
import {ErrorMessage} from '../../global/components/ErrorMessage';
import {useSignUpUser} from "../graphql/useSignUp";
import {useRouter} from "next/router";
import {useLoginUser} from "@/components/user-authentication/graphql/useLoginUser";

export const SignUp: React.FC = () => {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });
  const [signup, { data, error }] = useSignUpUser(inputs)
  const setUserLogged = useLoginUser(inputs)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the form from submitting
    await signup().catch(console.error);
    resetForm();
    const res = await setUserLogged();
    // Send the email and password to the graphqlAPI
    if (!res?.id) {
      console.log('error when logging')
    } else {
      router.push({pathname: `/events`});
    }
  }
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <ErrorMessage error={error} />
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
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}
