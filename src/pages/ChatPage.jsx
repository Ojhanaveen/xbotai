import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "../components/Message";
import RatingModal from "../components/RatingModal";
import sampleData from "../data/sampleData.json";

export default function ChatPage() {
  const { currentChat, setCurrentChat, saveConversation, newChat } = useContext(ChatContext);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setCurrentChat((prev) => [...prev, userMsg]);

    const matched = sampleData.find(
      (item) => item.question.toLowerCase() === input.trim().toLowerCase()
    );

    const aiResponse = matched
      ? matched.response
      : "Sorry, Did not understand your query!";

    const aiMsg = { sender: "ai", text: aiResponse };
    setTimeout(() => setCurrentChat((prev) => [...prev, aiMsg]), 800);

    setInput("");
  };

  const handleEndChat = () => {
    setShowModal(true);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  return (
    <div className="chat-page">
      <header className="topbar">
        <h1>Bot AI</h1>
      </header>

      <div className="chat-window">
        {currentChat.map((msg, idx) => (
          <Message key={idx} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={chatEndRef} />
      </div>

      <form
        className="input-bar"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          placeholder="Message Bot AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Ask</button>
      </form>

      <div className="chat-actions">
        <button type="button" onClick={handleEndChat}>
          Save & End Chat
        </button>
        <button type="button" onClick={newChat}>
          New Chat
        </button>
      </div>

      {showModal && <RatingModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
