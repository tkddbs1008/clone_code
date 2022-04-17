import axios from 'axios';

const api = axios.create({
    baseURL: 'http://13.209.155.82',
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
	add: (contents) => api.post('/api/posts', contents),
	edit: (id, contents) => api.put(`api/posts/${id}`, contents),
	del: (id) => api.delete(`api/posts/${id}`),
	posts: () => api.get('/api/posts'),
	join: (id) => api.put(`/api/posts/in/${id}`),
	leave: (id) => api.put(`/api/posts/out/${id}`),
	filter: (category) => api.get(`/api/category/${category}`, category),
	post: (id) => api.get(`/api/posts/${id}`, id),

	// comment
	addComment: (content) => api.post('/api/comments', content),
	delComment: (commentId) => api.delete(`/api/comments/${commentId}`),
	editComment: (content, commentId) =>
		api.put(`/api/comments/${commentId}`, content),

	// user
	login: (id, pwd) => api.post('/user/login', { username: id, password: pwd }),
	signup: (id, username, valueCheck) =>
		api.post('/user/signup', {
			username: id,
			nickname: username,
			password: valueCheck,
		}),
	loginCheck: () => api.get('/api/isLogin'),
};
