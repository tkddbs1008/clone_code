import {createAction, handleActions} from "redux-actions"
import {produce} from "immer"
import { setCookie, deleteCookie } from "../../Shared/Cookie"
import { apis } from "../../Shared/api"
import history from "../../index"

//action
const SET_USER = "SET_USER"
const LOG_OUT = "LOG_OUT"

//action creator
const setUser = createAction(SET_USER, (user) => ({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));

//initialState
const initialState = {
	is_login: false,
};


//thunk

const registerDB = (ID, Nickname, PWD) => {
    return function (dispatch, getState) {
        apis
                .signup(ID, Nickname, PWD)
                .then((res) => {
                    history.push('/login')
                })
                .catch((err) => {
                    console.log(err)
                });
        };
};

const loginDB = (username, password) => {
    return function (dispatch, getState) {
        apis
                .login(username, password)
                .then((res) => {
                    const auth = res.headers.authorization.split(" ")[1]
                    setCookie('token', auth, 3);
				    localStorage.setItem('username', username);
                    // dispatch(setUser({username: username}));
                        history.push('/')
                    })
                .catch((err) => {
                    window.alert('없는 회원정보 입니다! 회원가입을 해주세요!')
                });
    };
};

const loginCheck = () => {
    return async function (dispatch, getState) {
        await apis
                        .islogin()
                        .then((res) =>{
                            dispatch(setUser({
                            nickname: res.data.nickname,
                            profilePic: res.data.profile,
                            userid: res.data.id
                        }))
                        })
                        .catch((err)=>{
                            alert(err, "로그인 안됭")
                        })
    }
}

const logOutDB = () => {
	return function (dispatch, getState) {
		deleteCookie("token");
		localStorage.removeItem('username');
		dispatch(logOut());
		history.replace('/login');
	};
};


//reducer
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
    }),
}, initialState
);

const actionCreators = {
    registerDB,
    loginDB,
    logOutDB,
    loginCheck,
};

export { actionCreators };