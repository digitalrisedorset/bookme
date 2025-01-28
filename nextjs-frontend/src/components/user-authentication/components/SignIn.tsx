import {Form} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
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
    resetForm();
    if (!res?.id) {
      console.log('error when logging')
    } else {
      if (res?.role?.isHairdresser) {
        router.push({pathname: `/schedule`});
      } else {
        router.push({pathname: `/events`});
      }
    }
  }

  return (
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Sign Into Your Account</h2>
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
