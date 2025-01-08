import {ErrorMessage} from '../../global/components/ErrorMessage';
import {Form} from '../../global/styles/Form';
import {useForm} from '../../global/hooks/useForm';
import {useResetPassword} from "../graphql/useRequestPassword";

export const ResetPassword: React.FC = () => {
    const { inputs, handleChange} = useForm({
        email: '',
        password: '',
        token: ''
    });
    const [resetpassword, { data, error }] = useResetPassword(inputs);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        const res = await resetpassword().catch(console.error);
        //resetForm();
        console.log('resetpassword', res)
        // Send the email and password to the graphqlAPI  token: 'Vl_KYD5-i_l3DySiYjZl'  ttt
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset your password</h2>
            <ErrorMessage error={error} />
            <fieldset>
                {data?.redeemUserPasswordResetToken?.code === 'TOKEN_REDEEMED' && (
                    <p>Success! Your password is now reset!</p>
                )}

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
                <label htmlFor="token">
                    Token
                    <input
                        required
                        type="password"
                        name="token"
                        placeholder="Token"
                        autoComplete="token"
                        value={inputs.token}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit Password</button>
            </fieldset>
        </Form>
    );
}
