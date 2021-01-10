import axios from 'axios';


const instance = axios.create({
	baseURL: "https://react-burger-app-9ca4c.firebaseio.com/",
});

export default instance;