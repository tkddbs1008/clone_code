import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
import { actionsCreators as imageActions } from "./image";
import { apis } from "../../Shared/api"
import history from "../../index"


//action
const ADD_POST = "ADD_POST";
const GET_POST = "GET_POST";

//action creator
const addPost = createAction(ADD_POST, (post) => ({post}));
const getPost = createAction(GET_POST, (post_list) => ({post_list}));

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

const addPostDB = (content, image) => {
    const file = new FormData();

    file.append("content", content);
    file.append("imageFile", image);

    return function (dispatch, getState) {
        apis
                        .add(file)
                        .then(() => {
                                dispatch(addPost(content));
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


export default handleActions({
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post)
    }),
    [GET_POST]: (state, action) => produce(state, (draft) => {
        draft.list.push(...action.payload.post_list)
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.id === cur.id)] = cur;
            return acc;
          }
        }, []);
    })
}, initialState)

const actionCreators = {
    addPostDB,
    updatePostDB,
    getPostDB,
}

export {actionCreators}