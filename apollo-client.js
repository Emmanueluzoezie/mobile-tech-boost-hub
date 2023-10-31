import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: `https://sliedrecht.stepzen.net/api/nonplussed-toad/__graphql`,
    headers: { 'Authorization': `apikey ${process.env.STEPZEN_API_KEY}` },
    cache: new InMemoryCache(),
});

export default client;