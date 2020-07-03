import PostList from "../components/PostList"

import jsonPlaceholder from '../apis/jsonPlaceholder';

// dispatch and getState are special names in thunk
// we are able to use async await with thunk because in a synchronous action creator
// we are returning a request object, instead of an action. 
// Thunk only modifies the return value of the inner function
export const fetchPosts = () => async (dispatch, getState) => {
        const response = await jsonPlaceholder.get('/posts');
  
        dispatch({ type: 'FETCH_POSTS', payload: response.data })
};

// if multiple functions within function - syntax would look as follows
export const fetchPosts2 = () => {
    return async function(dispatch, getState) {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({ 
            type: 'FETCH_POSTS',
            payload: response
        });
    };
};

// normal circumstances - without redux thunk, this syntax is fine
// for normal action creators - returning an action object
export const selectPost = () => {
    return {
        type: 'SELECT_POST'
    }
};