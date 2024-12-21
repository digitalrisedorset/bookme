import {Form} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
import {ErrorMessage} from '../../global/components/ErrorMessage';
import {useLoginUser} from "../graphql/useLoginUser";
import {useRouter} from "next/router";

export const SignIn: React.FC = () => {
  const router = useRouter()
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const setUserLogged = useLoginUser(inputs)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the form from submitting
    const res = await setUserLogged();
    console.log('res login', res)
    resetForm();
    if (res !== undefined) {
      console.log('error when logging')
    } else {
      router.push({pathname: `/`});
    }
  }

  return (
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Sign Into Your Account</h2>
        <ErrorMessage />
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
