import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function RatingModal({ onClose }) {
  const { saveConversation } = useContext(ChatContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // preview when hovering
  const [comment, setComment] = useState("");
  const [reaction, setReaction] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }
    const feedback = { rating, comment, reaction };
    saveConversation(feedback);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Rate Your Conversation</h3>

        {/* Star Rating */}
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => {
            // Determine if star should be filled
            const fill = hoverRating
              ? star <= hoverRating
              : star <= rating;

            return (
              <span
                key={star}
                className={`star ${fill ? "selected" : ""}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ⭐
              </span>
            );
          })}
        </div>

        {/* Reaction buttons */}
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

        {/* Comment */}
        <textarea
          placeholder="Leave a comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />

        {/* Actions */}
        <div className="modal-actions">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
