/** @format */

// user context
import React, { createContext, useState } from 'react';

const UserContext = createContext();

function getUserFromLocalStorage() {
	return localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: { user: null, token: null };
}

function UserProvider({ children }) {
	const [user, setUser] = useState(getUserFromLocalStorage());
	const [alert, setAlert] = useState({ show: false, msg: '', type: 'success' });

	const showAlert = ({ msg, type = 'success' }) => {
		setAlert({ show: true, msg, type });
	};

	const hideAlert = () => setAlert({ ...alert, show: false });

	const userLogin = (user) => {
		setUser(user);
		localStorage.setItem('user', JSON.stringify(user));
	};

	const userLogout = () => {
		setUser({ username: null, token: null });
		localStorage.removeItem('user');
	};

	return (
		<UserContext.Provider
			value={{ user, userLogin, userLogout, alert, showAlert, hideAlert }}
		>
			{children}
		</UserContext.Provider>
	);
}

export { UserContext, UserProvider };
