import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
import { apis } from "../../Shared/api"


const PROFILE_POST_LIST = "PROFILE_POST_LIST";
const PROFILE_DATA = "PROFILE_DATA";

const getProfilePosts = createAction(PROFILE_POST_LIST, (post) => ({post}));
const getProfile = createAction(PROFILE_DATA, (data) => ({data}));

const initialState = {
    list: [],
    data: [],
}


//
const getProfData = (id) => {
    return function (dispatch) {
        apis
                        .myPost(id)
                        .then((res) =>{
                            dispatch(getProfilePosts(res.data.post))
                            delete res.data.post
                            const data = res.data
                            dispatch(getProfile(data))
                        }).catch((err) => {
                            alert(err)
                        })
    }
}

export default handleActions({
    [PROFILE_POST_LIST]: (state, action) => produce(state, (draft) => {
        draft.list.push(...action.payload.post)
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
    }),
    [PROFILE_DATA]: (state, action) => produce(state, (draft) => {
        draft.data = action.payload.data
    }),
}, initialState)

const actionsCreators = {
    getProfData,
}

export {actionsCreators}