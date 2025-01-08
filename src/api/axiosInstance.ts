import axios from 'axios'

const api = axios.create({
	baseURL: ' http://127.0.0.1:8000',
	// baseURL: 'http://192.168.8.104:8100',
	withCredentials: true,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	},
})

export default api;