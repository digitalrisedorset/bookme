| Component            | API call                                                  | Notes                                                        |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| **Browser / Widget** | `GET /auth/google?returnTo=…`                             | **Entry point.** Initiates Google login. No tokens involved. |
| **Auth-Bridge**      | `302 → {oauthUrl}/google/auth?returnTo=…`                 | Pure redirect. Bridge does **not** handle OAuth codes.       |
| **OAuth Server**     | `GET /google/auth`                                        | Starts Google OAuth flow.                                    |
| **Google**           | `GET {oauthUrl}/google/auth/callback?code=…`              | **Critical:** Google calls the OAuth server, not the bridge. |
| **OAuth Server**     | `302 → {bridgeUrl}/auth/auth-callback?token=…&returnTo=…` | OAuth server exchanges `code` → issues JWT.                  |
| **Auth-Bridge**      | `GET /auth/auth-callback?token=…`                         | Sets **httpOnly cookie**. No OAuth logic here.               |
| **Auth-Bridge**      | `Set-Cookie: token=JWT`                                   | Cookie scoped to bridge domain. Widget never reads it.       |
| **Auth-Bridge**      | `302 → returnTo`                                          | User lands back on host page logged in.                      |

| Component            | API call                               | Notes                                          |
| -------------------- | -------------------------------------- | ---------------------------------------------- |
| **Browser / Widget** | `POST /auth/refresh-session`           | Cookie automatically sent by browser.          |
| **Auth-Bridge**      | `POST {oauthUrl}/auth/refresh-session` | Forwards JWT as `Authorization: Bearer`.       |
| **OAuth Server**     | `200 { user }` or `204 / 401`          | Bridge converts response to `{ user } / null`. |
| **Browser / Widget** | *(local state)*                        | Widget now knows “logged in or not”.           |

| Component            | API call                    | Notes                                        |
| -------------------- | --------------------------- | -------------------------------------------- |
| **Browser / Widget** | `GraphQL / REST → Keystone` | Only after refresh-session says “logged in”. |
| **Keystone**         | *(protected resolvers)*     | Validates JWT / ACL. Bridge not involved.    |

| Component              | API call                      | Notes                                        |
| ---------------------- | ----------------------------- | -------------------------------------------- |
| **Browser / Widget**   | Turnstile widget              | Human verification before sensitive actions. |
| **Browser → Bridge**   | `POST /security/verify-human` | Bridge verifies with Cloudflare.             |
| **Browser → Keystone** | Protected mutation            | Only after human + auth pass.                |

| Route                        | Why it’s wrong                           |
| ---------------------------- | ---------------------------------------- |
| `/google/auth/callback`      | Bridge cannot exchange OAuth `code`.     |
| `/auth/google/auth/callback` | Ambiguous ownership of OAuth logic.      |
| `/auth/google/callback`      | Invites mis-wiring Google redirect URIs. |
