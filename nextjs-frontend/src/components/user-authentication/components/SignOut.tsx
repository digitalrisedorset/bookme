import {useSignOut} from "../graphql/useSignOut";
import {useRouter} from "next/router";

export const SignOut: React.FC = () => {
  const [signout] = useSignOut();
  const router = useRouter()

  function handleSignout() {
    signout()
    router.push({pathname: `/`});
  }

  return (
    <button type="button" onClick={handleSignout}>
      Sign Out
    </button>
  );
}
