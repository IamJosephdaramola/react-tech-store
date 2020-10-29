/** @format */

// register user
import axios from 'axios';

const registerUser = async (email, password, username) => {
	const response = await axios
		.post(`${process.env.REACT_APP_URL}/auth/local/register`, {
			username,
			email,
			password,
		})
		.catch((err) => console.log(err));
	return response;
};

export default registerUser;
