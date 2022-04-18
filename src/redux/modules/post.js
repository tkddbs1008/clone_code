import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
import { actionsCreators as imageActions } from "./image";
import { apis } from "../../Shared/api"
import history from "../../index"


//action
const ADD_POST = "ADD_POST";


//action creator
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false,
}

//thunk
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


export default handleActions({
    [ADD_POST]: (state, action) => produce(state, (draft) => {
        draft.post.list.unshift(action.payload.post)
    }),
}, initialState)

const actionCreators = {
    addPostDB,
}

export {actionCreators}