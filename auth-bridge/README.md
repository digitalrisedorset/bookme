# auth-bridge

## What this is

**auth-bridge** is a minimal, same-origin server whose only responsibility is to **forward browser session cookies to an OAuth server** and return authenticated user state (or `null`).

It exists because **client-side code cannot forward HttpOnly cookies cross-origin**.

That is the entire reason this service exists.

---

## What this is NOT

auth-bridge is **not**:

- an authentication server
- an OAuth implementation
- a token issuer
- a Keystone client
- a middleware layer
- a place to add business logic
- a reusable cross-origin service

If you are tempted to add any of the above, you are in the wrong repository.

---

## Architectural role (non-negotiable)

auth-bridge acts as an **identity bridge** between:

### Key invariants

- auth-bridge **must be deployed on the same origin as the frontend**
- auth-bridge **does not interpret authentication state**
- auth-bridge **does not mint or transform credentials**
- auth-bridge **collapses all failure to `{ user: null }`**

Unauthenticated is a valid state.  
Failure is not escalated.

---

## API contract

### `POST /<route.prefix>/refresh-session`

#### Behaviour

- Forwards incoming cookies verbatim to the OAuth server
- Returns `{ user }` if authenticated
- Returns `{ user: null }` if not authenticated or on any error

#### Guarantees

- Never throws authentication errors to clients
- Never leaks OAuth or Keystone internals
- Never exposes tokens

---

## Why this service must stay small

auth-bridge is a **trust boundary adapter**.

Trust boundaries **must not grow**.

Adding features here creates:

- duplicated auth logic
- confused ownership
- broken security assumptions
- accidental privilege escalation

If behaviour needs to change:

- **Authentication logic → OAuth server**
- **Application logic → Host application**
- **UI logic → Frontend / widget**

auth-bridge stays dumb by design.

---

## On CORS

auth-bridge is **same-origin by definition**.

- CORS is intentionally **not supported**
- Cross-origin usage is a misconfiguration
- If another domain needs auth-bridge, deploy another instance on that domain

If you think CORS is needed here, the architecture is being violated.

---

## Extension policy (read carefully)

> **This repository must never gain additional routes, controllers, or abstractions.**

If a second endpoint feels necessary, stop and re-evaluate the architecture.

The correct response is almost always:

> “This does not belong in auth-bridge.”

---

## Summary (the sentence to remember)

> auth-bridge exists only because browsers cannot forward cookies across origins.  
> When that problem disappears, this service should disappear too.

Until then, it stays **small, boring, and frozen**.