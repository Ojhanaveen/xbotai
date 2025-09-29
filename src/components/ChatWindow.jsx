// src/components/ChatWindow.jsx
import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

export default function ChatWindow() {
  const { currentConversation, sendMessage, addFeedback } = useChat();
  const [input, setInput] = useState("");

  // ✅ Define handleChat
  const handleChat = () => {
    if (!input.trim()) return;
    sendMessage(input); // send to context
    setInput(""); // clear input
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {currentConversation?.messages?.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "ai"}`}
          >
            <p>{msg.text}</p>

            {msg.sender === "ai" && (
              <div className="feedback-buttons">
                <button onClick={() => addFeedback(idx, "like")}>👍</button>
                <button onClick={() => addFeedback(idx, "dislike")}>👎</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleChat()}
        />
        <button onClick={handleChat}>Send</button>
      </div>
    </div>
  );
}
