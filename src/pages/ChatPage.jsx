import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "../components/Message";
import RatingModal from "../components/RatingModal";
import sampleData from "../data/sampleData.json";
import {Link} from "react-router-dom";

export default function ChatPage() {
  const { currentChat, addMessage, saveConversation, newChat } =
    useContext(ChatContext);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage("user", input);

    const matched = sampleData.find(
      (item) => item.question.toLowerCase() === input.trim().toLowerCase()
    );

    const aiResponse = matched
      ? matched.response
      : "Sorry, Did not understand your query!";

    setTimeout(() => {
      addMessage("ai", aiResponse);
    }, 800);

    setInput("");
  };

  const handleEndChat = () => {
    saveConversation();
    setShowModal(true);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  return (
    <div className="chat-page">
      {/* Header removed from here to prevent duplication */}
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
        <div style={{ display: "inline-block" }}>
          <Link to="/" onClick={newChat}>
            New Chat
          </Link>
        </div>
      </div>

      {showModal && <RatingModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
