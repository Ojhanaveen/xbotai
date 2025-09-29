import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function RatingModal({ onClose }) {
  const { saveConversation } = useContext(ChatContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reaction, setReaction] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }

    const feedback = { rating, comment, reaction };
    saveConversation(feedback); // save current chat + feedback
    onClose(); // close modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Rate Your Conversation</h3>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star selected" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

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

        <textarea
          placeholder="Leave a comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button> {/* Save button added */}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
