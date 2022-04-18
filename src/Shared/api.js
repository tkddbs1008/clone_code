import axios from 'axios';

const api = axios.create({
    baseURL: 'http://13.209.10.125',
    headers: {
        'content-type': 'application/json;charset=UTF-8',
		accept: 'application/json,',
    },
});


// cookie?
api.interceptors.request.use(function (config) {
	const accessToken = document.cookie.split('=')[1];
	config.headers.common['Authorization'] = `Bearer ${accessToken}`;
	return config;
});


export const apis = {
	// post
	// add: (file) => api.post('/api/posts',file),
	edit: (id, file) => api.put(`api/posts/${id}`, {file}),
	del: (id) => api.delete(`api/posts/${id}`),
	posts: () => api.get('/api/posts'),
	join: (id) => api.put(`/api/posts/in/${id}`),
	post: (id) => api.get(`/api/posts/${id}`, id),

	// comment
	addComment: (postid, content) => api.post('/api/comment', {
		postid: postid,
		content: content
	}),
	// delComment: (commentId) => api.delete(`/api/comments/${commentId}`),
	// editComment: (content, commentId) =>
	// 	api.put(`/api/comments/${commentId}`, content),

	// user
	login: (ID, PWD) => api.post('/user/login', { username: ID, password: PWD }),
	signup: (ID, Nickname, PWD, Check) =>
		api.post('/user/signup', {
			username: ID,
			nickname: Nickname,
			password: PWD,
			passwordCheck: Check,
		}),
	loginCheck: () => api.get('/api/isLogin'),
};
