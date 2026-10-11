import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useConversation from "../../zustand/useConversation";

const Home = () => {
	const { selectedConversation } = useConversation();

	return (
		<div className='flex w-full h-full min-w-0 sm:h-112.5 md:h-137.5 rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<div className={`${selectedConversation ? "hidden" : "flex"} sm:flex min-w-0`}>
				<Sidebar />
			</div>
			<div className={`${selectedConversation ? "flex" : "hidden"} sm:flex flex-1 min-w-0`}>
				<MessageContainer />
			</div>
		</div>
	);
};
export default Home;