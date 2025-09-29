import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";

export default function HistoryPage() {
  const { conversations } = useContext(ChatContext);
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="history-page">
      <h2>Past Conversations</h2>

      <div className="history-list">
        {conversations.length === 0 ? (
          <p>No saved conversations yet.</p>
        ) : (
          conversations.map((conv, index) => (
            <div key={index} className="conversation-summary">
              <button onClick={() => setSelectedIndex(index)}>
                Conversation {index + 1}
              </button>
            </div>
          ))
        )}
      </div>

      {/* Show selected conversation */}
      {selectedIndex !== null && (
        <div className="conversation-detail">
          <h3>Conversation {selectedIndex + 1}</h3>
          <div className="chat-messages">
            {conversations[selectedIndex].chat.map((msg, i) => (
              <p key={i} className={msg.sender}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>

          {conversations[selectedIndex].feedback && (
            <div className="conversation-feedback">
              <h4>Feedback</h4>
              <p>
                <strong>Rating:</strong>{" "}
                {"⭐".repeat(conversations[selectedIndex].feedback.rating)}
              </p>
              <p>
                <strong>Comment:</strong>{" "}
                {conversations[selectedIndex].feedback.comment || "No comment"}
              </p>
              <p>
                <strong>Reaction:</strong>{" "}
                {conversations[selectedIndex].feedback.reaction || "None"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
