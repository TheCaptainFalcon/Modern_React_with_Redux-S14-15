import PostList from "../components/PostList"
import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';


// memozied alternate version solution

// when calling an action creator when inside of an action creator (yes), we still have to dispatch the result of calling the action creator
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
   await dispatch(fetchPosts());
   
//    const userIds = _.uniq(_.map(getState().posts, 'userId'))
//    userIds.forEach(id => dispatch(fetchUser(id)));

    // refactored version of above 
    // note that in the .map, we only need the second argument bc it takes in the first from above in .chain
    // the same goes for uniq() as it takes in the result of previous function
    // same as in forEach
   _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    // need for execution
    .value();
};

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

export const fetchUser = (id) => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`)

    dispatch({
        type:'FETCH_USER',
        payload: response.data
    })
}

// // memoized version 1
// // issue with this is that you cannot reuse this same http request for other reasons
// // solution 2 is more reusable

// // newly combined and optimized memoized function
// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// }

// // private function noted by the _
// const _fetchUser = _.memoize(async(id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({
//         type: 'FETCH_USER',
//         payload: response.data
//     });
// });