/** @format */

//login user
/** @format */

// register user
import axios from 'axios';

const loginUser = async (email, password) => {
	const response = await axios
		.post(`${process.env.REACT_APP_URL}/auth/local`, {
			identifier: email,
			password,
		})
		.catch((err) => console.log(err));
	return response;
};

export default loginUser;
