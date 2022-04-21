import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
import { apis } from "../../Shared/api"


const PROFILE_POST_LIST = "PROFILE_POST_LIST";
const PROFILE_DATA = "PROFILE_DATA";

const getProfilePosts = createAction(PROFILE_POST_LIST, (post) => ({post}));
const getProfile = createAction(PROFILE_DATA, (data) => ({data}));



const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_CMNT = 'DETETE_CMNT';

const addComment = createAction(ADD_COMMENT,(content) => ({content}));
const deleteCmnt = createAction(DELETE_CMNT, (cmntId, postId) => ({cmntId, postId}));

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
                            dispatch(getProfilePosts(res.data.postDtos))
                            delete res.data.postDtos
                            const data = res.data
                            dispatch(getProfile(data))
                        }).catch((err) => {
                            alert(err)
                        })
    }
}

const addCommentDB = (postid, Comment) => {
    return function (dispatch, getState){
        console.log('댓글요청 시작')
        apis
                        .addComment(postid, Comment)
                        .then(function (response){
                            dispatch(addComment(response.data));
                        }).catch(function (error){
                            console.log(error)
                        })
    }
}

const deleteComment = (commentid) => {
  return function (dispatch, getState) {
    apis
                        .del(commentid)
                        .then((res) => {
                        console.log(res)
                        }).catch((err) => {
                          console.log(err)
                        })
  }
}


export default handleActions({
    [PROFILE_POST_LIST]: (state, action) => produce(state, (draft) => {
        draft.list.push(...action.payload.post)
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.postid === cur.postid) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.postid === cur.postid)] = cur;
            return acc;
          }
        }, []);
    }),
    [PROFILE_DATA]: (state, action) => produce(state, (draft) => {
        draft.data = action.payload.data
    }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list.push(action.payload.content)
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
    }),
}, initialState)

const actionsCreators = {
    getProfData,
    addCommentDB,
}

export {actionsCreators}