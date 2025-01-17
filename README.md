## Online Booking system designed with hairdressers in Mind

This system is developed to resolve a problem that many hairdressers have. 
- They have spaces in the salon that is not used. 
- They have availability that is not fulfill
- They have customers willing to find haircut but can't take the time to queue

## How is the system designed?

This system has a backend using the system KeystoneJS. This backend has 2 purposes. 
- It exposes a GraphQL schema that is powered by Postgres database. 
- It also ensures the system integrity by taking care of data triggers build-in in custom mutations/hooks/queries.

This system has a frontend that uses NextJS. The frontend presents the interfaces to deliver all the features available 
to web users. This part of the system has some specific additions:
- it uses `styled-component` to make the styling. (although I did hesitate to use TailwindCss, I find this approach simple and efficient. 
Since I am not a frontend engineer, it serves the purpose to deliver the styling without taking time for this requirement)
- it uses Apollo to handle the GraphQL communication. Unlike what I have seen in the past, 
I have wrapped my queries and mutations in hooks to separate the functionality and the rendering  in my React components.
- it uses some states that are not using Redux. I started with Redux and found that it was having too much boilerplates. Using the approach I use creates
a new state with `use-immer` or just `useState` with only 1 file. This approach works well with hooks.

### Final thoughts
Typescript is a big part for the whole project. Whilst I am still fighting the remaining `any` to get this project ready for a production state,
this language helps me to capture the bugs whilst I am writing my code. The strong part with using typescript is that I use it in both backend and frontend.
--> this particular aspect has meant all my codebase is written with a consistent style and that means less prone to bugs due to using different technologies 

I have created a patterns to deliver my React components: each data entity has its own directory to implement the component. Within each of these entity folder, I can
have the following sub-folders: components, graphql, hooks, models, state, styles, types
--> this pattern is still evolving but I have found it enables me to separate the responsabilities in the system fluidly. It has clearly helped to scale this system and ensure 
the performance is consistent over the whole system

This system does not use any API. I have another project that uses this same architecture and uses a NodeJS API system and Typescript of course.
This has given me the confidence that this approach to use the Javascript language in all my environments scales well and has yet more potential to be plugged in
with other environments easily