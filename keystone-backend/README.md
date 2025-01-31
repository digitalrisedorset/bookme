# create npm dependencies
npm install @keystone-6/core
npm install @keystone-6/auth
npm install typescript
npm install dotenv

# create Keystone core file
keystone.ts
schema.ts
config.ts
auth.ts

# launch keystone
npx keystone dev

# seed-data
npx keystone dev --seed-data-step 1