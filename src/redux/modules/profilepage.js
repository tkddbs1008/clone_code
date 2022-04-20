import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
import { apis } from "../../Shared/api"
import history from "../../index"


const PROFILE_POST_LIST = "PROFILE_POST_LIST";
const PROFILE_DATA = "PROFILE_DATA";

const getProfilePosts = createAction(PROFILE_POST_LIST, (post) => ({post}));
const getProfileData = createAction(PROFILE_DATA, (data) => ({data}));

const initialState = {

}


//
const getPostList = (id) => {
    return function (dispatch) {
        apis
                        .myPost(id)
                        .then((res) =>{
                            dispatch(getProfilePosts(res.data))
                        }).catch((err) => {
                            alert(err)
                        })
    }
}

export default handleActions({
    [PROFILE_POST_LIST]: (state, action) => produce(state, (draft) => {
        draft.mylist.push(...action.payload.post.post)
        draft.mylist = draft.mylist.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
    })
}, initialState)

const actionsCreators = {
    getPostList,
}

export {actionsCreators}