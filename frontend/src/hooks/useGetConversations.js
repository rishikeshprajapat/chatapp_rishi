import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const backendUrl = import.meta.env.VITE_API_URL;

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const { authUser, setAuthUser } = useAuthContext();

	useEffect(() => {
		if (!authUser) {
			setConversations([]);
			return;
		}

		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${backendUrl}/api/users`, {
					credentials:"include"
				});

				if (res.status === 401 || res.status === 403) {
					localStorage.removeItem("chat-user");
					setAuthUser(null);
					return;
				}

				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, [authUser, setAuthUser]);

	return { loading, conversations };
};
export default useGetConversations;