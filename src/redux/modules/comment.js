import { createAction, handleActions } from "redux-actions";
import { apis } from "../../Shared/api"
import { produce } from "immer";
import history from "../../index"



//action
const ADD_COMMENT = 'ADD_COMMENT';
const GET_COMMENT = 'GET_COMMENT';

//action creators
const addComment = createAction(ADD_COMMENT,(content) => ({content}));
const getComments = createAction(GET_COMMENT,(content) => ({content}));

const initialState = {
    comments : [],
}


//thunk
const addCommentDB = (postid, Comment) => {
  console.log(postid, Comment)
    return function (dispatch, getState){
        console.log('댓글요청 시작')
        apis
                        .addComment(postid, Comment)
                        .then(function (response){
                            console.log(response)
                            // dispatch(addComment(response.data));
                        }).catch(function (error){
                            console.log(error)
                        })
    }
}

const deleteComment = (commentid) => {
  console.log(commentid)
  return function (dispatch, getState) {
    apis
                        .del(commentid)
                        .then((res) => {

                        }).catch((err) => {
                          console.log(err)
                        })
  }
}
// const getComment = (Comment_info) => {
//     return function (dispatch, getState,{history}){
//         console.log('댓글요청 시작')
//         console.log(Comment_info)
//         apis
//         .
//         .then(function (response){
//             console.log(response)
//             dispatch(getComments(response.data));
//         }).catch(function (error){
//             console.log(error)
//         })
//     }
// }

// reducer
export default handleActions(
    {
      [ADD_COMMENT]: (state, action) =>
        produce(state, (draft) => {
            const arrays = [...state.comments.comments]
            arrays.unshift(action.payload.content);
            draft.comments.comments = arrays
        }),
      // [GET_COMMENT]: (state, action) =>
      //   produce(state, (draft) => {
      //     if(state.comments.comments)
      //       action.payload.content.comments =  state.comments.comments.concat(action.payload.content.comments)
      //     draft.comments = action.payload.content;
      //   }),
    },
    initialState
  );


//action creator export
const actionCreators = {
    addCommentDB,
    // getComment,
    deleteComment,
  };

export { actionCreators };