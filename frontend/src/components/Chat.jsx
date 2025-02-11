import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! 👋", sender: "bot" },
    { id: 2, text: "Hello! How can I help?", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { id: Date.now(), text: input, sender: "user" }]);
    setInput(""); // Clear input field
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-900 rounded-md shadow-lg">
      {/* Chat Header */}
      <div className="bg-gray-800 text-white text-lg font-semibold p-4 border-b border-gray-700">
        💬 Chat Section
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-700 text-gray-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center">
        <input
          type="text"
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="ml-3 bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 transition"
          onClick={sendMessage}
        >
          <FaPaperPlane size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
