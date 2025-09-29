import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import Message from "../components/Message";
import RatingModal from "../components/RatingModal";
import sampleData from "../data/sampleData"; // Processed JSON as object

export default function ChatPage() {
  const { currentChat, setCurrentChat, conversations, setConversations } =
    useContext(ChatContext);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const chatEndRef = useRef(null); // Scroll to bottom

  // Auto-scroll whenever chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  // Send user message
  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg = { sender: "user", text: input };
    setCurrentChat((prev) => [...prev, newUserMsg]);

    // Determine AI response
    const query = input.toLowerCase();
    const aiReply = sampleData[query] || sampleData["default"];
    const newAiMsg = { sender: "ai", text: aiReply };

    setTimeout(() => {
      setCurrentChat((prev) => [...prev, newAiMsg]);
    }, 500);

    setInput("");
  };

  // End chat and show modal
  const handleEndChat = () => {
    setShowModal(true);
  };

  // Save conversation from modal
  const handleSaveConversation = () => {
    const timestamp = new Date().toISOString();
    setConversations([...conversations, { chat: currentChat, timestamp }]);
    setCurrentChat([]);
    setShowModal(false);
  };

  return (
    <div className="chat-page">
      {/* Chat Window */}
      <div className="chat-window">
        {currentChat.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "ai"}`}
          >
            {msg.sender === "ai" ? (
              <>
                <span className="ai-name">Soul AI:</span>
                <p className="ai-text">{msg.text}</p>
              </>
            ) : (
              <p className="user-text">{msg.text}</p>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar with submit */}
      <form
        className="input-bar"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          placeholder="Message Bot AI…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Ask</button>
      </form>

      {/* End chat / Save button */}
      <div className="chat-actions">
        <button type="button" onClick={handleEndChat}>
          Save
        </button>
      </div>

      {/* Rating Modal */}
      {showModal && (
        <RatingModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveConversation}
        />
      )}
    </div>
  );
}
