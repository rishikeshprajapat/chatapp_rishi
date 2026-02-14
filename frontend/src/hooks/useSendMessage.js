import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const backendUrl = import.meta.env.VITE_API_URL;

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`${backendUrl}/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (!res.ok) {
				const err = (data && data.error) || res.statusText || "Request failed";
				throw new Error(err);
			}
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;