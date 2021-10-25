import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from "apollo-boost";
import {BASE_URL} from "./index";
import {getAccessToken, isLoggedIn} from "../auth";

const authLink = new ApolloLink((operation, forward) => {
    if (isLoggedIn()) {
        operation.setContext({
            headers: {authorization: `Bearer ${getAccessToken()}`}
        })
    }
    return forward(operation);
})

const apolloClient = new ApolloClient({
    link: ApolloLink.from([
        authLink,
        new HttpLink({uri: BASE_URL}) // ...(isLoggedIn() && {headers: {authorization: `Bearer ${getAccessToken()}`}})
    ]),
    cache: new InMemoryCache()
});

export default apolloClient;