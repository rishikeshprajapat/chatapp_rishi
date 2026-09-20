import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(() => {
		try {
			const storedUser = localStorage.getItem("chat-user");
			return storedUser ? JSON.parse(storedUser) : null;
		} catch {
			localStorage.removeItem("chat-user");
			return null;
		}
	});

	useEffect(() => {
		if (authUser) {
			localStorage.setItem("chat-user", JSON.stringify(authUser));
		} else {
			localStorage.removeItem("chat-user");
		}
	}, [authUser]);

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};