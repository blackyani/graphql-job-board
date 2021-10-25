import {isLoggedIn, getAccessToken} from "../auth";
const BASE_URL = 'http://localhost:9000/graphql';

const BASE_REQUEST_SETTINGS = {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        ...isLoggedIn() && {authorization: `Bearer ${getAccessToken()}`}
    },
}

const returnQueryWithSettings = (query, variables, operationName) => {
    return {
        ...BASE_REQUEST_SETTINGS,
        body: JSON.stringify({query, variables, operationName})
    }
}

export {BASE_URL, BASE_REQUEST_SETTINGS, returnQueryWithSettings};