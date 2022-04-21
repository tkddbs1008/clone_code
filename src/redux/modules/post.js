import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
// import { actionsCreators as imageActions } from "./image";
import { apis } from "../../Shared/api"
import history from "../../index"
import axios from "axios";


//action
const ADD_POST = "ADD_POST";
const GET_POST = "GET_POST";
const DELETE = "DELETE"

const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_CMNT = 'DETETE_CMNT';



//action creator
const addPost = createAction(ADD_POST, (post) => ({post}));
const getPost = createAction(GET_POST, (post_list) => ({post_list}));

const addComment = createAction(ADD_COMMENT,(content) => ({content}));
const deleteCmnt = createAction(DELETE_CMNT, (content) => ({content}))
const deletePost = createAction(DELETE, (post_id) => ({post_id}))



//initialState
const initialState = {
    list: [],
    is_loading: false,
    mylist: [],
}


//thunk
const getPostDB = () => {
    return async function (dispatch, getState) {
        const postlist = getState().post.list.length
        try {
            const { data } = await apis.posts(postlist)
            dispatch(getPost(data));
        } catch {
            console.log("왠지 모르지만 불러올수 없넹")
        }
    }
}


const addPostDB = (content, image, token) => {

    const file = new FormData();

    file.append("content", content);
    file.append("multipartFile", image);

    return function (dispatch, getState) {
        axios.post("http://13.209.10.125/api/posts", file, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        })
                        .then((res) => {
                                dispatch(addPost(res.data));
                        })
                        .catch((err) => {
                            window.alert('로그인한 회원만 작성할 수 있습니다')
                            console.log(err)
                        })
    }
}

const updatePostDB = (postid, content, token) => {

    console.log(postid, content, token)

    const file = new FormData();

    file.append("content", content);


    return function (dispatch, getState) {
        axios.put(`http://13.209.10.125/api/posts/${postid}`, file, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        })
                        .then((res) => {
                                dispatch(addPost(res));
                                history.push('/')
                        })
                        .catch((err) => {
                            window.alert('로그인한 회원만 작성할 수 있습니다')
                            console.log(err)
                        })
    }
}

const deletePostDB = (id) => {
    console.log(id)
    return function (dispatch, getState) {
        apis
                    .del(id)
                    .then((res) => {
                        //  dispatch(deletePost(id))
                        setTimeout(() =>{window.location.reload()}, 1000)
                    }).catch((err) =>{
                        console.log(err)
                    })
    }
}

const favPost = (id, post_data) => {

    return function (dispatch, getState) {
        apis
                    .fav(id)
                    .then((res) => {

                    }).catch((err) => {
                        console.log(err)
                    })
    }
}

const unfavPost = (id, post_data) => {

    return function (dispatch, getState) {
        apis
                    .unfav(id)
                    .then((res) => {

                    }).catch((err) => {
                        console.log(err)
                    })
    }
}

const addCommentDB = (postid, Comment) => {
    return function (dispatch, getState){
        console.log('댓글요청 시작')
        apis
                        .addComment(postid, Comment)
                        .then(function (response){
                            delete response.data.id
                            response.data.postid = postid
                            console.log(response.data)
                            dispatch(addComment(response.data));
                        }).catch(function (error){
                            console.log(error)
                        })
    }
}

const deleteComment = (commentid) => {
  return function (dispatch, getState) {
    apis
                        .delete(commentid)
                        .then((res) => {
                        console.log(res)
                        dispatch(deleteCmnt(res.data))
                        }).catch((err) => {
                          console.log(err)
                        })
  }
}


export default handleActions({
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post)
        window.location.reload();
    }),
    [GET_POST]: (state, action) => produce(state, (draft) => {
        draft.list.push(...action.payload.post_list)
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.postid === cur.postid) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.postid === cur.postid)] = cur;
            return acc;
          }
        }, []);
    }),
    [DELETE]: (state, action) => produce(state, (draft) => {
        draft.list = draft.list.filter((l) => l.postid !== action.payload.post_id);
    }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list.push(action.payload.content)
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.postid === cur.postid) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.postid === cur.postid)] = cur;
            return acc;
          }
        }, []);
    }),
    [DELETE_CMNT]: (state, action) => produce(state, (draft) => {
        draft.list.push(action.payload.content)
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.postid === cur.postid) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.postid === cur.postid)] = cur;
            return acc;
          }
        }, []);
    })
}, initialState)

const actionCreators = {
    addPostDB,
    updatePostDB,
    getPostDB,
    deletePostDB,
    favPost,
    unfavPost,
    addCommentDB,
    deleteComment,
}

export {actionCreators}