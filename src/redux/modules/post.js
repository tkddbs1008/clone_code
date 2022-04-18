import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
// import { actionsCreators as imageActions } from "./image";
import { apis } from "../../Shared/api"
import history from "../../index"
import axios from "axios";


//action
const ADD_POST = "ADD_POST";
const GET_POST = "GET_POST";
// const DELETE = "DELETE"

//action creator
const addPost = createAction(ADD_POST, (post) => ({post}));
const getPost = createAction(GET_POST, (post_list) => ({post_list}));
// const deletePost = createAction(DELETE, (post_id) => ({post_id}))



//initialState
const initialState = {
    list: [],
    is_loading: false,
}


//thunk
const getPostDB = () => {
    return async function (dispatch, getState) {
        try {
            const { data } = await apis.posts();
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
                                dispatch(addPost(res));
                                history.push('/')
                        })
                        .catch((err) => {
                            window.alert('로그인한 회원만 작성할 수 있습니다')
                            console.log(err)
                        })
    }
}

const updatePostDB = (content, image) => {
    const file = new FormData();

    file.append("content", content);
    file.append("image", image);

    return (dispatch, getState) => {
      apis
                    .edit(file)
                    .then((res) =>{
                        window.alert('수정 성공!!');
                        dispatch(getPost(res.data.postList));
                        history.replace('/');
                    }).catch((err)=>{
                        console.log('수정 실패!',err.response)
                    })
  }
};

const deletePostDB = (id) => {
    return function (dispatch, getState) {
        apis
                    .del(id)
                    .then((res) => {
                        // dispatch(deletePost())
                        window.location.reload()
                    }).catch((err) =>{
                        console.log(err)
                    })
    }
}

export default handleActions({
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post)
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
    // [DELETE]: (state, action) => produce(state, (draft) => {
    //     draft.list = draft.list.filter((l) => l.postid !== action.payload.post_id);
    // }),
}, initialState)

const actionCreators = {
    addPostDB,
    updatePostDB,
    getPostDB,
    deletePostDB,
}

export {actionCreators}