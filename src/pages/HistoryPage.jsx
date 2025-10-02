import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const { savedChats, newChat } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleNewChat = () => {
    newChat(); // reset conversation from context
    navigate("/"); // redirect to main chat page
  };

  return (
    <div className="chat-page">
      <header className="topbar">
        <h1>Bot AI</h1>
        <div style={{ marginLeft: "auto" }}>
          <button
            type="button"
            onClick={handleNewChat}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#1e88e5",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            New Chat
          </button>
        </div>
      </header>

      {savedChats.length === 0 ? (
        <p style={{ padding: "1rem" }}>No saved chats yet.</p>
      ) : (
        savedChats.map((item) => (
          <div key={item.id} className="chat-window">
            {item.chat.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.sender === "ai" && (
                  <span className="sender-name">Soul AI:</span>
                )}
                <p>{msg.text}</p>
              </div>
            ))}

            {item.feedback && (
              <div className="feedback-buttons">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= item.feedback.rating ? "star selected" : "star"
                      }
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <div className="reaction">
                  <button
                    className={
                      item.feedback.reaction === "like" ? "active" : ""
                    }
                  >
                    👍
                  </button>
                  <button
                    className={
                      item.feedback.reaction === "dislike" ? "active" : ""
                    }
                  >
                    👎
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
