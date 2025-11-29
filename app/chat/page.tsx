import Chatpage from "@/components/Chat";
import Sidebar from "@/components/Sidebar";

function Chat() {
  return (
    <div className="relative bg-gradient-to-br from-blue-100 to-white h-screen w-full">
      <Sidebar />
      <Chatpage />
    </div>
  );
}

export default Chat;
