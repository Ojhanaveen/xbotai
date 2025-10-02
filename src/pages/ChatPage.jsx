import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "../components/Message";
import RatingModal from "../components/RatingModal";
import sampleData from "../data/sampleData.json";

export default function ChatPage() {
  const { currentChat, addMessage, saveConversation, newChat } =
    useContext(ChatContext);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ Send user + AI response
  const handleSend = () => {
    if (!input.trim()) return;

    // User message
    addMessage("user", input);

    // Bot response
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

  // ✅ Open modal for feedback
  const handleEndChat = () => {
    setShowModal(true);
  };

  // ✅ When feedback is submitted from modal
  const handleSaveFeedback = (feedback) => {
    saveConversation(feedback); // save chat + feedback into localStorage
    setShowModal(false); // close modal
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  return (
    <div className="chat-page">
      <header className="topbar" id="bot-ai-header">
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
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            newChat();
          }}
        >
          New Chat
        </a>
      </div>

      {showModal && (
        <RatingModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveFeedback} // ✅ Pass callback
        />
      )}
    </div>
  );
}
