import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function FeedbackButtons() {
  const { currentChat, saveConversation } = useContext(ChatContext);
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reaction, setReaction] = useState("");

  return (
    <div className="feedback-buttons">
      {/* Stars */}
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${
              star <= (hoveredStar || rating) ? "selected" : ""
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Reactions */}
      <div className="reaction">
        <button
          className={reaction === "like" ? "active" : ""}
          onClick={() => setReaction("like")}
        >
          👍
        </button>
        <button
          className={reaction === "dislike" ? "active" : ""}
          onClick={() => setReaction("dislike")}
        >
          👎
        </button>
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={() => saveConversation({ rating, reaction })}
      >
        Save
      </button>
    </div>
  );
}
