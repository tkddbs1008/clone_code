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
	del: (id) => api.delete(`api/posts/${id}`),
	posts: (loadPost) => api.get(`/api/posts/${loadPost}`),
	post: (id) => api.get(`/api/profile/${id}`, id),
	fav: (id) => api.post(`/api/like/${id}`),
	unfav: (id) => api.delete(`/api/like/${id}`),
	myPost: (id) => api.get(`/api/posts/${id}`),

	// comment
	addComment: (postid, content) => api.post('/api/comment', {
		postid: postid,
		content: content
	}),
	del: (commentId) => api.delete(`/api/comment/${commentId}`),
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
	islogin: () => api.get('/api/islogin'),
};
